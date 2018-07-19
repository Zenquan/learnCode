/**
 * mysql封装
 * @author 巴神
 * 2017/9/10
 * @author Treasure
 * @description 基于TS封装
 * 2017/12/31
 */

import * as mysql from 'mysql';
import is from '../util/is';

/**
 * @interface sqlResult
 */
interface SQLResult {
  ec: number;
  es: string;
  result?: object;
  total?: number; 
}

/**
 * @interface InsertOption
 */
interface InsertOption {
  tbName: string;
  data: any;
}

/**
 * @method generator where function
 * @description generator where's condition
 * @param {Object} query condition, could be an Object or an Array
 * @returns {string} query string
 */
function createWhereText(terms: any): string {
  let whereText: string = '';
  if(terms) {
    whereText = ' where (1=1) and ';
    
  } else {
    whereText = ' where (1=1) '
  }
  let list: string[];
  if(is.Object(terms)) {
    for(let key in terms) {
      list.push(`${key} = '${terms[key]}'`);
    }
  } else if (is.Array(terms)) {
    terms.forEach(v => {
      list.push(v.field + " " + v.term + " " + "'" + v.value + "'")
    });
  }
  return whereText;
}

export class MySQL {
  config: mysql.PoolConfig;
  pool: mysql.Pool;

  constructor(config: mysql.PoolConfig) {
    this.config = config;
    this.pool = mysql.createPool(config);
  }

  /**
   * @method query
   * @param {sql}
   * @param {options}
   * @returns {Object}
   */
  query(sql: string, options): Promise<SQLResult> {
    let self = this;
    return new Promise((resolve, reject) => {
      self.pool.getConnection((err, conn) => {
        err ? reject(err) : (conn.query(sql, options, function(err:any, result:any, fields:any) {
          conn.release();
          err ? reject({
            ec: -1,
            es: err
          }) : resolve({
            ec: 0,
            es: "success",
            result: result
          });
        }));
      });
    });
  }

  insert(options: InsertOption): Promise<SQLResult> {
    let self = this;
    return new Promise(async (resolve, reject) => {
      try {
        let data = options.data,
          sqlText = "insert into " + options.tbName + " ",
          keys = [],
          values = [];
        let conn = await self.sqlTransaction();
        if (is.Array(data)) {
          data.forEach(v => {
            let _values = [],
              _keys = [];
              for(let k in v) {
                _values.push("'" + v[k] + "'");
                _keys.push(k);
              }
              conn.add(sqlText + "(" + _keys.join(" , ") + ")" + " values ( " + _values.join(" , ") + " ) ");
          });
        } else if (is.Object(data)) {
          for(let k in data) {
            keys.push(k);
            values.push(data[k]);
          }
          sqlText += "(" + keys.join(" , ") + ")" + " values (" + values.join(" , ") + ")  ";
          conn.add(sqlText);
        }
        resolve(await conn.exec());
      } catch (err) {
        reject(err);
      }
    });
  }

  update(options): Promise<SQLResult> {
    let self = this;
    return new Promise(async (resolve, reject) => {
      try {
        let data = options.data,
          sqlText = "update " + options.tbName + " set ",
          fields = [],
          terms = [];
        for (let k in data) {
          fields.push(k + " =  '" + data[k] + "' ");
        }
        sqlText += fields.join(" , ") + createWhereText(options.terms);
        resolve(await self.query(sqlText, options));
      } catch (err) {
        reject(err);
      }
    });
  }

  select(options): Promise<SQLResult> {
    let self = this;
    return new Promise(async (resolve, reject) => {
      try {
        let sqlText = "select ";
        if(is.Array(options.fields) && options.fields.length) {
          sqlText += " " + options.fields.join(" , ") + " ";
        } else {
          sqlText += " * ";
          sqlText += " from " + options.tbName + " ";
          sqlText += createWhereText(options.terms);
          resolve(await self.query(sqlText, options));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  remove(options): Promise<SQLResult> {
    let self = this;
    return new Promise(async (resolve, reject) => {
      try {
        let sqlText = "delete from " + options.tbName;
        let conn = await self.sqlTransaction();
        if (is.Object(options.terms)) {
          sqlText += createWhereText(options.terms);
          conn.add(sqlText);
        } else if (is.Array(options.terms)) {
          options.terms.forEach((v) => {
            conn.add(sqlText + createWhereText(v));
          });
        }
        resolve(await conn.exec());
      } catch (e) {
        reject(e);
      }
    });
  }

  sqlTransaction(): Promise<Transactionn> {
    let self = this;
    return new Promise((resolve, reject) => {
      self.pool.getConnection((err, conn) => {
        err ? reject(err) : resolve(new Transactionn(conn));
      });
    });
  }
 }

 /**
  * @class Transacton 事务类
  */
 class Transactionn {
   connection: mysql.PoolConnection;
   instance: Transactionn = null;
   sqlList: string[];

   constructor(conn: mysql.PoolConnection) {
    if(this.instance) { return this.instance; }
    this.connection = conn;
    this.sqlList = [];
    this.instance = this;
   }

   add(sqlText: string) {
     this.sqlList.push(sqlText);
   }

   exec(): Promise<any> {
     let self = this;
     return new Promise((resolve, reject) => {
       self.connection.beginTransaction(async () => {
         try {
           for(let i = 0; i <= self.sqlList.length; i++) {
             i < self.sqlList.length ? await self.query(self.sqlList[i]) : resolve(await self.commit());
           }
         } catch (e) {
           reject(e);
         }
       });
     });
   }

   query(sql: string): Promise<SQLResult> {
    let self = this;
    return new Promise((resolve, reject) => {
      self.connection.query(sql, (err, result) => {
        err ? self.connection.rollback(er => {
          self.connection.release();
          reject({
            ec: -1,
            es: er || err
          });
        }) : resolve(result);
      });
    });
   }

   commit(): Promise<SQLResult> {
    let self = this;
    return new Promise((resolve, reject) => {
      self.connection.commit(err => {
        err ? (self.connection.rollback(() => {
          reject({
            ec: -1,
            es: err
          });
        })) : self.connection.release(), resolve({
          ec: 0,
          es: "事务执行成功",
          total: self.sqlList.length
        });
      });
    });
   }
 }