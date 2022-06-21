#!/usr/bin/env node


const initSearch = require('./src/crawler');
const { argv } = require("yargs")
  .scriptName("crawler")
  .usage("Uso: $0 -u string -m num -d string")
  .example(
    "$0 -u 'https://test.com' -m 6 -d dbName",
    "Retorna algo"
  )
  .option("u", {
    alias: "url",
    describe: "URL deseada",
    demandOption: "La url es requerida",
    type: "string",
    nargs: 1,
  })
  .option("m", {
    alias: "maxdist",
    describe: "Distancia máxima desde la url original",
    demandOption: "La maxima distancia es requerida",
    type: "number",
    nargs: 1,
  })
  .option("d", {
    alias: "db",
    describe: "Nombre de la Base de Datos",
    demandOption: "El nombre de la base de datos es requerido",
    type: "string",
    nargs: 1,
  })
  .describe("help", "Mostrar Ayuda.") // Override --help 
  .epilog("copyright Tony 2022");

const { url, maxdist, db} = argv;

  console.log(`Crawling ${url}`);

  initSearch({
    url: url,
    maxdist: maxdist,
    db: db
  });

