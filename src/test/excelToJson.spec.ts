import fs from "fs";
import xlsx from "xlsx";

describe("excelToJson.ts", () => {
  it("1.fs file exist", () => {
    const val = fs.existsSync("./src/test/test.xlsx");
    expect(val).toBe(true);
  });
  it("2.fs file doesn't exist", () => {
    const val = fs.existsSync("./error-path/test.xlsx");
    expect(val).toBe(false);
  });
  it("3.xlsx sheetName", () => {
    const data = xlsx.readFile("./src/test/test.xlsx", {
      sheetStubs: true,
      cellDates: true,
    });
    expect(data.SheetNames[0]).toBe("Feuille1");
  });
  it("4.xlsx sheet data", () => {
    const data = xlsx.readFile("./src/test/test.xlsx", {
      sheetStubs: true,
      cellDates: true,
    });
    const sheetData = xlsx.utils.sheet_to_json(data.Sheets["Feuille1"]);
    expect(sheetData[0]).toStrictEqual({ test1: "Alan", test2: "Ragnar" });
  });
});
