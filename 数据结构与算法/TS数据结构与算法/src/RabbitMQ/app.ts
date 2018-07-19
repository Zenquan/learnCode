import * as Koa from 'koa'
import * as Router from 'koa-router'
import { rabbit } from './Rabbit'
import chalk from 'chalk'
import * as body from 'koa-body'

const app = new Koa()
const router = new Router()
const log = console.log

// 定义一个 Promise 避免每次都重复调用
const CHANNEL = rabbit.getChannel()

const Queue = 'node'
const ex = 'logs'
const key = 'anonymous.info'


app.use(body())

// 普通的消息队列  WorkQueues
router.post('/send', async ctx => {
  const ch = await CHANNEL
  // 定义信道具有持久性
  ch.assertQueue(Queue, { durable: true })

  if (typeof ctx.request.body.content !== 'string') {
    ctx.status = 400
    ctx.body = {
      status: 'faild'
    }
    return
  }

  ch.sendToQueue(Queue, Buffer.from(ctx.request.body.content))
  ctx.body = {
    result: 'success'
  }
  log(chalk.magenta`[x] Sent${ctx.request.body.content}`)
})

// 带 exchange 的消息队列 Publis&Subscribe
router.post('/exchange', async ctx => {
  const ch = await CHANNEL
  ch.assertExchange(ex, 'fanout', { durable: false })
  try {
    // 默认为空的名字
    ch.publish(ex, '', Buffer.from(ctx.request.body.content))
    ctx.body = {
      result: 'success'
    }
  } catch (error) {
    console.error(chalk.red`${error.toString()}`)
    ctx.body = error
  }
})

// 带routing的exchange
router.post('/routing', async ctx => {
  const ch = await CHANNEL
  // 设置 exchange 的名字 以及分发方法
  ch.assertExchange('direct_logs', 'direct', { durable: false })
  try {
    // 向管道分发 info 级的方法
    ch.publish('direct_logs', 'info', Buffer.from(ctx.request.body.content))
    ctx.body = {
      result: 'success'
    }
  } catch (error) {
    console.error(chalk.red`${error.toString()}`)
    ctx.body = error
  }
})

// topic的
router.post('/topic', async ctx => {
  const ch = await CHANNEL

  ch.assertExchange(ex, 'topic', { durable: false })
  ch.publish(ex, key, Buffer.from(ctx.request.body.content))

})

app.use(router.routes())

const server = app.listen(3000, () => {
  const address = server.address()
  log(chalk.green`Server is lisitening at ${address.address}:${address.port.toString()}`)
})

