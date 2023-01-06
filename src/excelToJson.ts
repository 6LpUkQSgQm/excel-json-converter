import xlsx from "xlsx";
import fs from "fs";
import chalk from "chalk";

const log = console.log;
chalk.level = 1;

const excelToJson = (config: { input: string; output: string }) => {
  if (fs.existsSync(config.input)) {
    log(chalk.blue("INFO: ... generate json"));
    const workbook = xlsx.readFile(config.input, {
      sheetStubs: true,
      cellDates: true,
    });
    const sheetNames = workbook.SheetNames;
    let data: { name: string; data: unknown[] }[] = [];
    sheetNames.forEach((sheetName, index) => {
      const sheetData = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheetNames[index]]
      );
      data.push({ name: sheetName, data: sheetData });
    });
    if (!config.output) {
      log(chalk.green("SUCCESS: data generated."));
      return data;
    }
    if (config.output) {
      return fs.writeFile(
        `./${config.output}`,
        JSON.stringify(Array.from(data)),
        (err) => {
          if (err) {
            log(chalk.red(`ERROR: ${err}`));
          } else log(chalk.green("SUCCESS: file generated."));
        }
      );
    } else log(chalk.red("ERROR: An error has been occured."));
  } else log(chalk.red("ERROR: File does not exist."));
};
export default excelToJson;
