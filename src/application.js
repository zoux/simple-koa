/**
 * @file application 对象
 */

const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

module.exports = class Application {
  constructor () {
    this.middlewareList = [];
    this.context = context;
    this.request = request;
    this.response = response;
  }

  /**
   * 开启 http server 并传入 callback
   */
  listen (...arg) {
    const server = http.createServer(this.callback());
    server.listen(...arg);
  }

  /**
   * 中间件挂载
   *
   * @param {Function} middleware 中间件函数
   */
  use (middleware) {
    this.middlewareList.push(middleware);
  }

  /**
   * 获取 http server 所需的 callback 函数
   *
   * @return {Function} fn
   */
  callback () {
    return (req, res) => {
      const ctx = this.createContext(req, res);
      const fn = this.compose();
      const respond = () => this.responseBody(ctx);
      fn(ctx).then(respond);
    };
  }

  /**
   * 构造 ctx
   *
   * @param {Object} req req实例
   * @param {Object} res res实例
   * @return {Object} ctx实例
   */
  createContext (req, res) {
    const ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  /**
   * 中间件合并方法，将中间件数组合并为一个中间件
   *
   * @return {Function}
   */
  compose () {
    // 将 middlewareList 合并为一个函数，该函数接收一个 ctx 对象
    return async ctx => {
      let next = async () => {
        return Promise.resolve();
      };
      for (let i = this.middlewareList.length - 1; i >= 0; i -= 1) {
        next = createNext(this.middlewareList[i], next);
      }
      await next();

      function createNext (middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext);
        };
      }
    };
  }

  /**
   * 对客户端消息进行回复
   *
   * @param {Object} ctx ctx实例
   */
  responseBody (ctx) {
    const content = ctx.body;
    if (typeof content === 'object') {
      ctx.res.end(JSON.stringify(content));
    } else {
      ctx.res.end(content);
    }
  }
};
