#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var excelToJson_1 = __importDefault(require("./excelToJson"));
var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var path = require("path");
var program = require("commander");
clear();
console.log(chalk.magenta(figlet.textSync("excel json converter", {
    font: "Rectangles",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
})));
program
    .version("1.0.0")
    .description("A CLI to convert Excel file to JSON file")
    .option("-f, --file <type>", "Open specified file")
    .option("-o, --output <type>", "Output file path")
    .parse(process.argv);
var options = program.opts();
if (options.file)
    console.log("".concat(options.file, "  - file"));
if (options.output)
    console.log("".concat(options.output, "  - output"));
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
if (options.file)
    (0, excelToJson_1.default)({ input: options.file, output: options.output });
