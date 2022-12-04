import * as fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

export const readInputRaw = (filepath: string): Promise<string> =>
    readFile(filepath, "utf-8");

export const readInputSplit = async (filepath: string): Promise<string[]> => {
    const lines = (await readFile(filepath, "utf-8")).split("\n");
    lines.pop();
    return lines;
}

export const readInputSplitNum = async (filepath: string): Promise<number[]> => {
    const lines = (await readFile(filepath, "utf-8")).split("\n").map(Number);
    lines.pop();
    return lines;
}

export const readInputGrid = async (filepath: string): Promise<string[][]> => {
    const lines = (await readFile(filepath, "utf-8")).split("\n").map(l => l.split(""));
    lines.pop();
    return lines;
}

export enum InputMode {
    Raw,
    Split,
    SplitNum,
    Grid
}

function readInput(filepath: string, mode: InputMode.Raw): Promise<string>;
function readInput(filepath: string, mode: InputMode.Split): Promise<string[]>;
function readInput(filepath: string, mode: InputMode.SplitNum): Promise<number[]>;
function readInput(filepath: string, mode: InputMode.Grid): Promise<string[][]>;
function readInput(filepath: string, mode: InputMode) {
    switch (mode) {
        case InputMode.Raw:
            return readInputRaw(filepath);
        case InputMode.Split:
            return readInputSplit(filepath);
        case InputMode.SplitNum:
            return readInputSplitNum(filepath);
        case InputMode.Grid:
            return readInputGrid(filepath);
    }
}

export default readInput;
