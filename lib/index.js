#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const excelToJson_1 = __importDefault(require("./excelToJson"));
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const program = new commander_1.Command();
// Clear the console
(0, clear_1.default)();
// Display the program title in the console with style
console.log(chalk_1.default.magenta(figlet_1.default.textSync("Excel to JSON Converter", {
    font: "Ghost",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
})));
// Configure the CLI program options
program
    .name("excel-json-converter")
    .version("1.0.5")
    .description("A command-line tool to convert Excel files to JSON.")
    .option("-f, --file <path>", "Path to the Excel file to convert")
    .option("-o, --output <path>", "Path to the output JSON file")
    .action((options) => {
    // Display the file paths if specified
    if (options.file)
        console.log(`File to convert: ${options.file}`);
    if (options.output)
        console.log(`Output file: ${options.output}`);
    // Execute the conversion if a file is specified
    if (options.file) {
        (0, excelToJson_1.default)({ input: options.file, output: options.output });
    }
    else {
        console.error(chalk_1.default.red("Error: No file specified."));
        process.exit(1);
    }
});
// Display help if no commands are specified
if (!process.argv.slice(2).length) {
    program.help();
}
// Parse the command line arguments
program.parse(process.argv);
//# sourceMappingURL=index.js.map