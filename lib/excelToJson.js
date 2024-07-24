"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const promises_1 = __importDefault(require("fs/promises")); // Use the promise version of fs
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const log = console.log;
chalk_1.default.level = 1; // Set chalk level for color support
// Function to convert Excel file to JSON
const excelToJson = async (config) => {
    try {
        // Resolve the input and output paths
        const inputPath = path_1.default.resolve(config.input);
        const outputPath = config.output ? path_1.default.resolve(config.output) : null;
        // Check if the input file exists
        try {
            await promises_1.default.access(inputPath);
        }
        catch (error) {
            log(chalk_1.default.red("ERROR: File does not exist."));
            return;
        }
        // Notify user that JSON generation is starting
        log(chalk_1.default.blue("INFO: Generating JSON..."));
        // Read the Excel file
        const workbook = xlsx_1.default.readFile(inputPath, {
            sheetStubs: true,
            cellDates: true, // Convert date cells into JS date objects
        });
        // Get all sheet names
        const sheetNames = workbook.SheetNames;
        // Convert each sheet to JSON
        const data = sheetNames.map((sheetName) => ({
            name: sheetName,
            data: xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetName]), // Sheet data
        }));
        // If no output path is provided, log success and return data
        if (!outputPath) {
            log(chalk_1.default.green("SUCCESS: Data generated."));
            return data;
        }
        // Write the JSON data to the output file
        await promises_1.default.writeFile(outputPath, JSON.stringify(data));
        log(chalk_1.default.green("SUCCESS: File generated."));
        return;
    }
    catch (error) {
        // Log any errors that occur
        log(chalk_1.default.red(`ERROR: ${error}`));
        return null;
    }
};
exports.default = excelToJson;
//# sourceMappingURL=excelToJson.js.map