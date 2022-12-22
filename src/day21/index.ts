import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

type NumberMonkey = { val: number; }
type OpMonkey = {
    left: string;
    right: string;
    name: string;
    operation: "+" | "-" | "*" | "/";
}

type Monkey = NumberMonkey | OpMonkey;

const part1 = (input: Record<string, Monkey>) => {
    const getValue = (monkey: string): number => {
        if ("val" in input[monkey]) {
            const m = input[monkey] as NumberMonkey;
            return m.val;
        } else {
            const m = input[monkey] as {
                left: string;
                right: string;
                operation: "+" | "-" | "*" | "/";
            };
            switch (m.operation) {
                case "+":
                    return getValue(m.left) + getValue(m.right);
                case "-":
                    return getValue(m.left) - getValue(m.right);
                case "*":
                    return getValue(m.left) * getValue(m.right);
                case "/":
                    return getValue(m.left) / getValue(m.right);
            }
        }
    }

    return getValue("root");
};

const part2 = (input: Record<string, Monkey>) => {
    const getValue = (monkey: string): number => {
        if ("val" in input[monkey]) {
            const m = input[monkey] as { val: number };
            return m.val;
        } else {
            const m = input[monkey] as {
                left: string;
                right: string;
                operation: "+" | "-" | "*" | "/";
            };
            switch (m.operation) {
                case "+":
                    return getValue(m.left) + getValue(m.right);
                case "-":
                    return getValue(m.left) - getValue(m.right);
                case "*":
                    return getValue(m.left) * getValue(m.right);
                case "/":
                    return getValue(m.left) / getValue(m.right);
            }
        }
    }

    const hasValue = (monkey: string, target: string): boolean => {
        if ("val" in input[monkey]) {
            return monkey === target;
        } else {
            const m = input[monkey] as {
                left: string;
                right: string;
                operation: "+" | "-" | "*" | "/";
            };
            return hasValue(m.left, target) || hasValue(m.right, target);
        }
    }

    const getPathToValue = (monkey: string, target: string, pastPath: OpMonkey[] = []): OpMonkey[] => {
        if ("val" in input[monkey]) {
            return pastPath;
        } else {
            const m = input[monkey] as OpMonkey;
            if (hasValue(m.left, target)) {
                return [...pastPath, m, ...getPathToValue(m.left, target, pastPath)];
            } else if (hasValue(m.right, target)) {
                return [...pastPath, m, ...getPathToValue(m.right, target, pastPath)];
            } else {
                return [...pastPath, m];
            }
        }
    }

    const root = input.root as OpMonkey;
    const leftSide = getValue(root.left);
    const rightSide = getValue(root.right);

    const leftHasHuman = hasValue(root.left, "humn");
    let targetValue = leftHasHuman ? rightSide : leftSide;
    const pathToHumn = !leftHasHuman ? getPathToValue(root.right, "humn") : getPathToValue(root.left, "humn");

    for (const item of pathToHumn) {
        const fixedSide = hasValue(item.left, "humn") ? item.right : item.left;
        if (item.operation === "+") {
            if (fixedSide === item.left) {
                targetValue -= getValue(item.left);
            } else {
                targetValue -= getValue(item.right);
            }
        } else if (item.operation === "-") {
            if (fixedSide !== item.left) {
                targetValue += getValue(item.right);
            } else {
                targetValue = getValue(item.left) - targetValue;
            }
        } else if (item.operation === "*") {
            if (fixedSide === item.left) {
                targetValue /= getValue(item.left);
            } else {
                targetValue /= getValue(item.right);
            }
        } else if (item.operation === "/") {
            if (fixedSide === item.left) {
                targetValue = getValue(item.left) / targetValue;
            } else {
                targetValue *= getValue(item.right);
            }
        }
    }

    return targetValue;
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed = input.map(l => l.split(": ")).reduce((acc, l) => {
        return { ...acc, [l[0]]: (() => { if (Number(l[1]).toString() === l[1]) {
            return { val: Number(l[1]) };
        } else {
            const operation = l[1].split(" ")[1][0];
            return {
                name: l[0],
                left: l[1].split(` ${operation} `)[0],
                right: l[1].split(` ${operation} `)[1],
                operation
            };
        } })() };
    }, {});

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
