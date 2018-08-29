/**
 * @file request 对象
 */

const url = require('url');

module.exports = {
  /**
   * 读取到 url 中的参数，返回一个对象
   */
  get query () {
    return url.parse(this.req.url, true).query;
  }
};
