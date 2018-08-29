/**
 * @file context 对象
 */

/**
 * 定义 request/response 中要代理的 setter/getter
 */
const requestGet = ['query'];
const requestSet = [];
const responseGet = ['body', 'status'];
const responseSet = responseGet;

/**
 * 为 proto 名为 property 的属性设置 getter/setter
 */
const proto = {};

requestGet.forEach(key => defineGetter('request', key));
requestSet.forEach(key => defineSetter('request', key));
responseGet.forEach(key => defineGetter('response', key));
responseSet.forEach(key => defineSetter('response', key));

function defineGetter (property, name) {
  Object.defineProperty(proto, name, {
    configurable: true,
    get () {
      return this[property][name];
    }
  });
}

function defineSetter (property, name) {
  Object.defineProperty(proto, name, {
    configurable: true,
    set (val) {
      this[property][name] = val;
    }
  });
}

module.exports = proto;

// 上述代码等同于下面：
// module.exports = {
//   get query () {
//     return this.request.query;
//   },
//
//   get body () {
//     return this.response.body;
//   },
//   set body (data) {
//     this.response.body = data;
//   },
//
//   get status () {
//     return this.response.status;
//   },
//   set status (data) {
//     this.response.status = data;
//   }
// };
