const simpleKoa = require('../src/application');
const app = new simpleKoa();

app.use((req, res) => {
  res.writeHead(200);
  res.end('HW');
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
