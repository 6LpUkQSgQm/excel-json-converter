"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_1 = __importDefault(require("xlsx"));
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var log = console.log;
chalk_1.default.level = 1;
var excelToJson = function (config) {
    if (fs_1.default.existsSync(config.input)) {
        log(chalk_1.default.blue("INFO: ... generate json"));
        var workbook_1 = xlsx_1.default.readFile(config.input, {
            sheetStubs: true,
            cellDates: true,
        });
        var sheetNames_1 = workbook_1.SheetNames;
        var data_1 = [];
        sheetNames_1.forEach(function (sheetName, index) {
            var sheetData = xlsx_1.default.utils.sheet_to_json(workbook_1.Sheets[sheetNames_1[index]]);
            data_1.push({ name: sheetName, data: sheetData });
        });
        if (!config.output) {
            log(chalk_1.default.green("SUCCESS: data generated."));
            return data_1;
        }
        if (config.output) {
            return fs_1.default.writeFile("./".concat(config.output), JSON.stringify(Array.from(data_1)), function (err) {
                if (err) {
                    log(chalk_1.default.red("ERROR: ".concat(err)));
                }
                else
                    log(chalk_1.default.green("SUCCESS: file generated."));
            });
        }
        else
            log(chalk_1.default.red("ERROR: An error has been occured."));
    }
    else
        log(chalk_1.default.red("ERROR: File does not exist."));
};
exports.default = excelToJson;
