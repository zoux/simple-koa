const http = require('http');

module.exports = class Application {
  constructor () {}

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
   * @param {function} fn
   */
  use (fn) {
    this.callbackFunc = fn;
  }

  /**
   * 获取 http server 所需的 callback 函数
   *
   * @return {function} fn
   */
  callback () {
    return (req, res) => {
      this.callbackFunc(req, res);
    }
  }
};
