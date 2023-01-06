declare const excelToJson: (config: {
    input: string;
    output: string;
}) => void | {
    name: string;
    data: unknown[];
}[];
export default excelToJson;
