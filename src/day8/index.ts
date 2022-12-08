import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const part1 = (input: number[][]) => {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            const height = input[i][j];
            const left = input[i].filter((_, idx) => idx < j);
            const right = input[i].filter((_, idx) => idx > j);
            const up = input.map(l => l[j]).filter((_, idx) => idx < i);
            const down = input.map(l => l[j]).filter((_, idx) => idx > i);
            if (Math.max(...left) < height || Math.max(...right) < height || Math.max(...up) < height || Math.max(...down) < height) {
                sum++;
            }
        }
    }
    return sum;
};

const part2 = (input: number[][]) => {
    const scores: number[][] = [];
    for (let i = 0; i < input.length; i++) {
        scores.push([]);
        for (let j = 0; j < input[i].length; j++) {
            const height = input[i][j];
            const left = input[i].filter((_, idx) => idx < j);
            left.reverse();
            const right = input[i].filter((_, idx) => idx > j);
            const up = input.map(l => l[j]).filter((_, idx) => idx < i);
            up.reverse();
            const down = input.map(l => l[j]).filter((_, idx) => idx > i);
            const leftScore = (left.findIndex(l => l >= height) + 1) || left.length;
            const rightScore = (right.findIndex(l => l >= height) + 1) || right.length;
            const upScore = (up.findIndex(l => l >= height) + 1) || up.length;
            const downScore = (down.findIndex(l => l >= height) + 1) || down.length;
            const total = leftScore * rightScore * upScore * downScore;
            scores[scores.length - 1].push(total);
        }
    }
    return Math.max(...scores.flat());
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Grid);
    const parsed = input.map(l => l.map(Number));

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
