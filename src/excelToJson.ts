import xlsx from "xlsx";
import fs from "fs/promises"; // Use the promise version of fs
import chalk from "chalk";
import path from "path";

const log = console.log;
chalk.level = 1; // Set chalk level for color support

// Function to convert Excel file to JSON
const excelToJson = async (config: { input: string; output?: string }) => {
  try {
    // Resolve the input and output paths
    const inputPath = path.resolve(config.input);
    const outputPath = config.output ? path.resolve(config.output) : null;

    // Check if the input file exists
    try {
      await fs.access(inputPath);
    } catch (error) {
      log(chalk.red("ERROR: File does not exist."));
      return;
    }

    // Notify user that JSON generation is starting
    log(chalk.blue("INFO: Generating JSON..."));
    // Read the Excel file
    const workbook = xlsx.readFile(inputPath, {
      sheetStubs: true, // Include empty cells
      cellDates: true, // Convert date cells into JS date objects
    });
    // Get all sheet names
    const sheetNames = workbook.SheetNames;
    // Convert each sheet to JSON
    const data = sheetNames.map((sheetName) => ({
      name: sheetName, // Sheet name
      data: xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]), // Sheet data
    }));

    // If no output path is provided, log success and return data
    if (!outputPath) {
      log(chalk.green("SUCCESS: Data generated."));
      return data;
    }

    // Write the JSON data to the output file
    await fs.writeFile(outputPath, JSON.stringify(data));
    log(chalk.green("SUCCESS: File generated."));
    return;
  } catch (error) {
    // Log any errors that occur
    log(chalk.red(`ERROR: ${error}`));
    return null;
  }
};

export default excelToJson;
