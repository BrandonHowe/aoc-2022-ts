import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const snafuCodes: Record<number, string> = {
    [-2]: "=",
    [-1]: "-",
    0: "0",
    1: "1",
    2: "2"
}

const part1 = (input: string[]) => {
    const getValueForStr = (str: string) => {
        const reversed = str.split("").reverse();
        let sum = 0;
        for (let i = 0; i < reversed.length; i++) {
            const char = reversed[i];
            if (Number(char).toString() === char) {
                sum += Number(char) * Math.pow(5, i);
            } else if (char === "-") {
                sum -= Math.pow(5, i);
            } else if (char === "=") {
                sum -= Math.pow(5, i) * 2;
            }
        }
        return sum;
    }

    const total = input.reduce((acc, cur) => acc + getValueForStr(cur), 0);

    const toSNAFU = (val: number) => {
        let currNum = val;
        let res = "";

        for (let j = 0; j < 100; j++) {
            for (let i = -2; i <= 2; i++) {
                if ((currNum + i * Math.pow(5, j)) % Math.pow(5, j + 1) === 0) {
                    res += snafuCodes[-i];
                    currNum += i * Math.pow(5, j);
                    break;
                }
            }
        }

        const split = res.split("");
        split.reverse();
        const first = split.findIndex(l => l !== "0");
        return split.slice(first).join("");
    }

    return toSNAFU(total);
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);

    console.time("part1");

    console.log(part1(input));

    console.timeEnd("part1");
};

main();
