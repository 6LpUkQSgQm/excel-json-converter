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
  .version("1.1.0")
  .description("A command-line tool to convert Excel files to JSON.")
  .option("-f, --file <path>", "Path to the Excel file to convert")
  .option("-o, --output <path>", "Path to the output JSON file")
  .action((options) => {
    // Display the file paths if specified
    if (options.file) console.log(`File to convert: ${options.file}`);
    if (options.output) console.log(`Output file: ${options.output}`);

    // Execute the conversion if a file is specified
    if (options.file) {
      excelToJson({ input: options.file, output: options.output });
    } else {
      console.error(chalk.red("Error: No file specified."));
      process.exit(1);
    }
  });

// Display help if no commands are specified
if (!process.argv.slice(2).length) {
  program.help();
}

// Parse the command line arguments
program.parse(process.argv);