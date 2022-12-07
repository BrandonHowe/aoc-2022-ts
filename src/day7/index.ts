import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const getTotalSize = (rec: Record<string, any>) => {
    let total = 0;
    for (const i in rec) {
        if (typeof rec[i] === "number") {
            total += rec[i];
        } else {
            total += getTotalSize(rec[i]);
        }
    }
    return total;
}

const part1 = (input: string[]) => {
    const tree: Record<string, any> = {};

    let currentPath: string[] = [];

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        if (line[0] === "$") {
            if (line.slice(2).startsWith("cd")) {
                const dir = line.split(" cd ")[1];
                if (dir === "..") {
                    currentPath.pop();
                } else if (dir === "/") {
                    currentPath = [];
                } else {
                    currentPath.push(dir);
                }
            } else if (line.slice(2).startsWith("ls")) {
                i++;
                while (!input[i]?.startsWith("$")) {
                    if (input[i] === undefined) break;
                    const currThing = input[i];
                    let head = tree;
                    for (const leaf of currentPath) {
                        if (leaf in head) {
                            head = head[leaf];
                        } else {
                            head[leaf] = {};
                            head = head[leaf];
                        }
                    }
                    if (currThing.startsWith("dir")) {

                    } else {
                        head[currThing.split(" ")[1]] = Number(currThing.split(" ")[0]);
                    }
                    if (input[i + 1]?.startsWith("$")) break;
                    i++;
                }
            }
        }
    }
    let sum = 0;
    const doStuff = (node: Record<string, any>) => {
        for (const i in node) {
            if (typeof node[i] === "number") {

            } else {
                const totalSize = getTotalSize(node[i]);
                if (totalSize <= 100000) {
                    sum += totalSize;
                }
                doStuff(node[i]);
            }
        }
    }
    doStuff(tree);
    return sum;
};

const part2 = (input: string[]) => {
    const tree: Record<string, any> = {};

    let currentPath: string[] = [];

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        if (line[0] === "$") {
            if (line.slice(2).startsWith("cd")) {
                const dir = line.split(" cd ")[1];
                if (dir === "..") {
                    currentPath.pop();
                } else if (dir === "/") {
                    currentPath = [];
                } else {
                    currentPath.push(dir);
                }
            } else if (line.slice(2).startsWith("ls")) {
                i++;
                while (!input[i]?.startsWith("$")) {
                    if (input[i] === undefined) break;
                    const currThing = input[i];
                    let head = tree;
                    for (const leaf of currentPath) {
                        if (leaf in head) {
                            head = head[leaf];
                        } else {
                            head[leaf] = {};
                            head = head[leaf];
                        }
                    }
                    if (currThing.startsWith("dir")) {

                    } else {
                        head[currThing.split(" ")[1]] = Number(currThing.split(" ")[0]);
                    }
                    if (input[i + 1]?.startsWith("$")) break;
                    i++;
                }
            }
        }
    }
    let sum = 0;
    let things: number[] = [];
    const doStuff = (node: Record<string, any>) => {
        for (const i in node) {
            if (typeof node[i] === "number") {

            } else {
                const totalSize = getTotalSize(node[i]);
                if (totalSize <= 100000) {
                    sum += totalSize;
                }
                things.push(totalSize);
                doStuff(node[i]);
            }
        }
    }
    doStuff(tree);

    const totalSize = getTotalSize(tree);
    const remaining = 30000000 - (70000000 - totalSize);

    return Math.min(...things.filter(l => l >= remaining));
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);

    console.time("part1");

    console.log(part1(input));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(input));

    console.timeEnd("part2");
};

main();
