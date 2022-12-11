import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

type Monkey = {
    starting: number[];
    operation: { arg1: number | string; arg2: number | string; multiplication: boolean }
    testNum: number;
    testTrue: number;
    testFalse: number;
}

const part1 = (input: Record<number, Monkey>) => {
    const monkeyFreq: Record<number, number> = {};

    const runMonkey = (monkeyNum: number) => {
        const monkey = input[monkeyNum];
        for (let i = 0; i < monkey.starting.length; i++) {
            const thing = monkey.starting[i];
            if (!thing) break;
            if (monkeyFreq[monkeyNum]) {
                monkeyFreq[monkeyNum]++;
            } else {
                monkeyFreq[monkeyNum] = 1;
            }
            const val1 = monkey.operation.arg1 === "old" ? thing : monkey.operation.arg1 as number;
            let val2 = 0;
            if (monkey.operation.multiplication) {
                val2 = val1 * (monkey.operation.arg2 === "old" ? thing : monkey.operation.arg2 as number);
            } else {
                val2 = val1 + (monkey.operation.arg2 === "old" ? thing : monkey.operation.arg2 as number);
            }
            val2 = Math.floor(val2 / 3);
            monkey.starting.shift();
            if (val2 % monkey.testNum === 0) {
                input[monkey.testTrue].starting.push(val2);
            } else {
                input[monkey.testFalse].starting.push(val2);
            }
            i--;
        }
    }

    for (let round = 0; round < 20; round++) {
        for (let i = 0; i < Object.keys(input).length; i++) {
            runMonkey(i);
        }
    }

    return Object.values(monkeyFreq).sort((a, b) => b - a).slice(0, 2).reduce((acc, cur) => acc * cur);
};

const part2 = (input: Record<number, Monkey>) => {
    const monkeyFreq: Record<number, number> = {};
    const totalFactor = Object.values(input).reduce((acc, cur) => acc * cur.testNum, 1);

    const runMonkey = (monkeyNum: number) => {
        const monkey = input[monkeyNum];
        for (let i = 0; i < monkey.starting.length; i++) {
            const thing = monkey.starting[i];
            if (!thing) break;
            if (monkeyFreq[monkeyNum]) {
                monkeyFreq[monkeyNum]++;
            } else {
                monkeyFreq[monkeyNum] = 1;
            }
            const val1 = monkey.operation.arg1 === "old" ? thing : monkey.operation.arg1 as number;
            let val2 = 0;
            if (monkey.operation.multiplication) {
                val2 = val1 * (monkey.operation.arg2 === "old" ? thing : monkey.operation.arg2 as number);
            } else {
                val2 = val1 + (monkey.operation.arg2 === "old" ? thing : monkey.operation.arg2 as number);
            }
            val2 = val2 % totalFactor;
            monkey.starting.shift();
            if (val2 % monkey.testNum === 0) {
                input[monkey.testTrue].starting.push(val2);
            } else {
                input[monkey.testFalse].starting.push(val2);
            }
            i--;
        }
    }

    for (let round = 0; round < 10000; round++) {
        for (let i = 0; i < Object.keys(input).length; i++) {
            runMonkey(i);
        }
    }

    return Object.values(monkeyFreq).sort((a, b) => b - a).slice(0, 2).reduce((acc, cur) => acc * cur);
};

const main = async () => {
    const input = (await readInput(path.join(__dirname, "./input.txt"), InputMode.Raw)).split("\n\n").map(l => l.split("\n"));
    const parsed: Record<number, Monkey> = {};
    const parsed2: Record<number, Monkey> = {};

    for (const thing of input) {
        const num = Number(thing[0].split(" ")[1].split(":")[0]);
        const starting = thing[1].split("Starting items: ")[1].split(", ").map(Number);
        const operationStr = thing[2].split("new = ")[1];
        const operationArg = operationStr.includes("*");
        const operationStrSplit = operationArg ? operationStr.split(" * ") : operationStr.split(" + ");
        const operation = {
            arg1: Number.isNaN(Number(operationStrSplit[0])) ? operationStrSplit[0] : Number(operationStrSplit[0]),
            arg2: Number.isNaN(Number(operationStrSplit[1])) ? operationStrSplit[1] : Number(operationStrSplit[1]),
            multiplication: operationArg
        };
        const testNum = +thing[3].split(" by ")[1];
        const testTrue = +thing[4].split("If true: throw to monkey ")[1];
        const testFalse = +thing[5].split("If false: throw to monkey ")[1];
        const monkey = { starting, operation, testNum, testTrue, testFalse };
        parsed[num] = { ...monkey };
        parsed2[num] = { ...monkey };
    }

    // console.log(parsed);

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed2));

    console.timeEnd("part2");
};

main();
