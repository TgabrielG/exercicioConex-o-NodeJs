const express = require("express");
const {
  filiais,
  incial,
  filiaisComFull,
  paginaçao,
} = require("./controlls/constrolls");

const rotas = express();

rotas.get("/", incial);
rotas.get("/filiais", filiais);
rotas.get("/filiaisFull", filiaisComFull);
rotas.get("/pagina", paginaçao);

module.exports = rotas;
