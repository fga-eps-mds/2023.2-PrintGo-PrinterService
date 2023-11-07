const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//CORS habilitation
app.use(cors());

//JSON and URL encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//database
let database = {
  printers: [],
};

//regiter printer route
app.post("/register-printer", (req, res) => {
  const { name, model, ip } = req.body;
  if (!name || !model || !ip) {
    return res
      .status(400)
      .send({ message: "Nome, modelo e IP são obrigatórios" });
  }
  //New object
  const newPrinter = {
    id: database.printers.length + 1,
    name,
    model,
    ip,
  };

  // Add database
  database.printers.push(newPrinter);

  //response
  res.status(201).send(newPrinter);
});

//Routs to lister printers
app.get("printers", (req, res) => {
  res.send(database.printers);
});

//Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta ${PORT}");
});
