/**
 * @file application 对象
 */

const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

module.exports = class Application {
  constructor () {
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
   * 挂载回调函数
   *
   * @param {Function} fn 回调处理函数
   */
  use (fn) {
    this.callbackFunc = fn;
  }

  /**
   * 获取 http server 所需的 callback 函数
   *
   * @return {Function} fn
   */
  callback () {
    return (req, res) => {
      const ctx = this.createContext(req, res);
      const respond = () => this.responseBody(ctx);
      this.callbackFunc(ctx).then(respond);
    }
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
