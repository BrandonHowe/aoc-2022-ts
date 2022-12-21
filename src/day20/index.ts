import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const part1 = (input: number[]) => {
    const mapped = input.map((l, idx) => [l, idx]);

    for (let i = 0; i < input.length; i++) {
        const target = mapped.findIndex(l => l[1] === i);
        const val = mapped[target][0];
        mapped.splice(target, 1);
        mapped.splice((target + val) % mapped.length, 0, [val, i]);
    }

    const newOrder = mapped.map(l => l[0]);
    const zeroPlace = newOrder.indexOf(0);
    return newOrder[(zeroPlace + 1000) % newOrder.length] + newOrder[(zeroPlace + 2000) % newOrder.length] + newOrder[(zeroPlace + 3000) % newOrder.length];
};

const part2 = (input: number[]) => {
    const mapped = input.map(l => l * 811589153).map((l, idx) => [l, idx]);

    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < input.length; i++) {
            const target = mapped.findIndex(l => l[1] === i);
            const val = mapped[target][0];
            mapped.splice(target, 1);
            mapped.splice((target + val) % mapped.length, 0, [val, i]);
        }
    }

    const newOrder = mapped.map(l => l[0]);
    const zeroPlace = newOrder.indexOf(0);
    return newOrder[(zeroPlace + 1000) % newOrder.length] + newOrder[(zeroPlace + 2000) % newOrder.length] + newOrder[(zeroPlace + 3000) % newOrder.length];
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.SplitNum);

    console.time("part1");

    console.log(part1(input));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(input));

    console.timeEnd("part2");
};

main();
