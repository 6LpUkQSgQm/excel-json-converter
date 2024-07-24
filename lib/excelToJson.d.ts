declare const excelToJson: (config: {
    input: string;
    output?: string;
}) => Promise<{
    name: string;
    data: unknown[];
}[] | null | undefined>;
export default excelToJson;
