import * as fs from "fs";
import { promisify } from "util";

export enum InputFlags {
    Nothing,
    SplitRows,
    SplitNumbers,
    Grid
}

export const readInput = async (filepath: string, flag: InputFlags) => {
    const readFile = promisify(fs.readFile);

    const data = await readFile(filepath, "utf-8");
    switch (flag) {
        case InputFlags.Nothing:
            return data;
        case InputFlags.SplitRows:
            return data.split("\n");
        case InputFlags.SplitNumbers:
            return data.split("\n").map(Number);
        case InputFlags.Grid:
            return data.split("\n").map(l => l.split(""));
    }
};
