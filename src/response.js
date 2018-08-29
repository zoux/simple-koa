/**
 * @file response 对象
 */

module.exports = {
  /**
   * body 方法，用于构造返回信息
   */
  get body () {
    return this._body;
  },
  set body (data) {
    this._body = data;
  },

  /**
   * 读取和设置 http response 的状态码
   */
  get status () {
    return this.res.statusCode;
  },
  set status (data) {
    if (typeof data !== 'number') throw new Error('statusCode must be a number!');
    this.res.statusCode = data;
  }
};
