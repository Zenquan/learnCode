/**
 * @class 单例模式
 * @description 确保一个类只有一个实例，并提供一个全局访问点
 */
export class Single {

  static instance: Single;

  name?: string;

  constructor(name?:string) {
    if(Single.instance) {
      return Single.instance;
    }
    if(name) {
      this.name = name;
    } else {
      this.name = 'origin';
    }
    Single.instance = this;
  }
}

export class StaticSingle {
  static instance: StaticSingle;
  private name:string = 'StaticSingle';

  private constructor() {
    if(StaticSingle.instance) {
      return StaticSingle.instance;
    }
    console.log(`生成静态实例${this.name}`);
  }

  static getInstance(): StaticSingle {
    if(!StaticSingle.instance) {
      StaticSingle.instance = new StaticSingle();
    }
    return StaticSingle.instance;
  }

}

// import { StaticSingle } from './Single';

// let single1 = StaticSingle.getInstance();
// let single2 = StaticSingle.getInstance();
// //let single3 = new StaticSingle();

// console.log(single1 === single2);
// //console.log(single1 === single3);