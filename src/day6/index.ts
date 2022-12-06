import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const part1 = (input: string) => {
    for (let i = 0; i < input.length - 4; i++) {
        const hasDuplicate = [...new Set([...input.slice(i, i + 4)])].length !== 4;
        if (!hasDuplicate) return i + 4;
    }
};

const part2 = (input: string) => {
    for (let i = 0; i < input.length - 14; i++) {
        const hasDuplicate = [...new Set([...input.slice(i, i + 14)])].length !== 14;
        if (!hasDuplicate) return i + 14;
    }
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Raw);

    console.time("part1");

    console.log(part1(input));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(input));

    console.timeEnd("part2");
};

main();
