import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const compareLists = (list1: (number | number[])[], list2: (number | number[])[]): boolean | undefined => {
    for (let i = 0; i < Math.max(list1.length, list2.length); i++) {
        let val1 = list1[i];
        let val2 = list2[i];
        if (val1 === undefined && val2 === undefined) continue;
        if (val1 === undefined) return true;
        if (val2 === undefined) return false;
        if (typeof val1 === "number" && typeof val2 === "number") {
            if (val1 < val2) return true;
            if (val1 > val2) return false;
            if (val1 === val2) continue;
        }
        if (!Array.isArray(val1)) {
            const v = compareLists([val1], val2 as number[]);
            if (v !== undefined) return v;
        }
        if (!Array.isArray(val2)) {
            const v = compareLists(val1 as number[], [val2]);
            if (v !== undefined) return v;
        }

        const v = compareLists(val1 as number[], val2 as number[]);
        if (v !== undefined) {
            return v;
        }
    }
}

const part1 = (input: [(number | number[])[], (number | number[])[]][]) => {
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
        const compared = compareLists(...input[i]);
        if (compared) {
            sum += i + 1;
        }
    }
    return sum;
};

const part2 = (raw: [(number | number[])[], (number | number[])[]][]) => {
    const input = raw.flat();
    const thing1 = [2];
    const thing2 = [6]
    input.push(thing1, thing2);

    const sorted = input.sort((a, b) => {
        const order = compareLists(a, b);
        if (order) { return -1 } else { return 1 };
    });
    return (sorted.indexOf(thing1) + 1) * (sorted.indexOf(thing2) + 1);
};

const main = async () => {
    const input = (await readInput(path.join(__dirname, "./input.txt"), InputMode.Raw));
    const intermediate = input.split("\n\n").map(l => l.split("\n"));
    intermediate[intermediate.length - 1].pop();
    const parsed = intermediate.map(l => l.map(j => JSON.parse(j)) as [(number | number[])[], (number | number[])[]]);

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
