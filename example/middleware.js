/**
 * @file 中间件demo
 */

const simpleKoa = require('../src/application');
const app = new simpleKoa();

const resData = {};

app.use(async (ctx, next) => {
  resData.name = 'sean';
  await next();
  ctx.body = resData;
});

app.use(async (ctx, next) => {
  resData.age = 24;
  await next();
});

app.use(async (ctx, next) => {
  resData.sex = 'male';
  await next();
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
