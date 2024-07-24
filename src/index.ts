#!/usr/bin/env node

// Import necessary modules
import excelToJson from "./excelToJson";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { Command } from "commander";

const program = new Command();

// Clear the console
clear();

// Display the program title in the console with style
console.log(
  chalk.magenta(
    figlet.textSync("Excel to JSON Converter", {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
    })
  )
);

// Configure the CLI program options
program
  .name("excel-json-converter")
  .version("1.1.2")
  .description("A command-line tool to convert Excel file to JSON file.")
  .option("-i, --input <path>", "Path to the input Excel file")
  .option("-o, --output <path>", "Path to the output JSON file")
  .action((options) => {
    // Display the file paths if specified
    if (!options.input || !options.output) {
      console.error(
        chalk.red("Error: Both input file and output file must be specified.")
      );
      process.exit(1);
    }

    // Execute the conversion if a file is specified
    console.log(`File to convert: ${options.input}`);
    console.log(`Output file: ${options.output}`);
    excelToJson({ input: options.input, output: options.output });
  });

// Display help if no commands are specified
if (!process.argv.slice(2).length) {
  program.help();
}

// Parse the command line arguments
program.parse(process.argv);
