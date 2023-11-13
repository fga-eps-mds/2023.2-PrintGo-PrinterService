import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.listen(port, () => {
  console.log(`server rodando em http://localhost:${port}`);
});
