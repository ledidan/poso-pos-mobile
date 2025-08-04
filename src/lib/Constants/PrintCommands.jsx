// Poso Reserved

// Print commands for Epson & others
// https://github.com/mosquito/python-escpos/blob/master/escpos/constants.py

const EPSON = {
  init: `\x1B\x40`,
  lineBreak: "\x0A",
  centerAlign: `\x1B\x61\x31`,
  leftAlign: `\x1B\x61\x30`,
  rightAlign: `\x1B\x61\x32`,
  boldOn: `\x1B\x45\x01`,
  boldOff: `\x1B\x45\x00`,
  standardFontSize: `\x1b\x21\x10`,
  doubleFontSize: `\x1B\x21\x20`,
  partialCut: `\x1D\x56\x01`,
};

// Print commands for Star
// https://github.com/opentable/star-printing

const STAR = {
  init: `\x1B\x40`,
  lineBreak: "\x0A",
  centerAlign: `\x1B\x1D\x61\x01`,
  leftAlign: `\x1B\x1D\x61\x00`,
  rightAlign: `\x1B\x1D\x61\x02`,
  boldOn: `\x1B\x45`,
  boldOff: `\x1B\x46`,
  standardFontSize: `\x1B\x57\x00\x1B\x68\x01`,
  doubleFontSize: `\x1B\x57\x01\x1B\x68\x14`,
  partialCut: `\x1b\x64\x03`,
};

const PRINT_COMMANDS = {
  EPSON,
  STAR,
};

export default PRINT_COMMANDS;
