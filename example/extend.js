/**
 * @file ctx扩展demo
 */

const simpleKoa = require('../src/application');
const app = new simpleKoa();

/**
 * 定义一个扩展方法
 */
app.context.echoData = function (errNo = 0, errMsg = '', data = null) {
  this.res.setHeader('Content-Type', 'application/json;charset=utf-8');
  this.body = { errNo, errMsg, data };
};

app.use(async ctx => {
  const data = {
    name: ctx.query.name || 'sean',
    age: 24,
    sex: 'male'
  };
  ctx.echoData(0, 'success', data);
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
