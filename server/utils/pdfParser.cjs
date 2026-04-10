"use strict";
const mod = require("pdf-parse");
const PDFParse = mod.PDFParse;

module.exports = async function parsePDF(buffer) {
  const instance = new PDFParse({
    verbosity: 0,
    max: 0,
    data: buffer,
  });
  return instance.getText();
};