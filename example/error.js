/**
 * @file 错误处理demo
 */

const simpleKoa = require('../src/application');
const app = new simpleKoa();

app.use(async ctx => {
  throw new Error('throw some error');
});

app.on('error', err => {
  console.log(err.stack);
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
