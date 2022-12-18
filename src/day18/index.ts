import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const part1 = (input: [number, number, number][]) => {
    const adjacentCubes: [number, number][] = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i][0] === input[j][0] && input[i][1] === input[j][1] && Math.abs(input[i][2] - input[j][2]) === 1) adjacentCubes.push([i, j]);
            if (input[i][1] === input[j][1] && input[i][2] === input[j][2] && Math.abs(input[i][0] - input[j][0]) === 1) adjacentCubes.push([i, j]);
            if (input[i][2] === input[j][2] && input[i][0] === input[j][0] && Math.abs(input[i][1] - input[j][1]) === 1) adjacentCubes.push([i, j]);
        }
    }

    return input.length * 6 - (adjacentCubes.length * 2);
};

const part2 = (input: [number, number, number][]) => {
    let accountedCubes: [number, number, number][] = [];
    let nextCubes: [number, number, number][] = [];

    accountedCubes.push([0, 0, 0]);
    nextCubes.push([1, 0, 0]);
    nextCubes.push([0, 0, 1]);
    nextCubes.push([0, 1, 0]);

    const bound = 25;

    while (nextCubes.length) {
        const queue: [number, number, number][] = [];
        for (const nextCube of nextCubes) {
            const adjacencies = [
                [nextCube[0] + 1, nextCube[1], nextCube[2]],
                [nextCube[0] - 1, nextCube[1], nextCube[2]],
                [nextCube[0], nextCube[1] + 1, nextCube[2]],
                [nextCube[0], nextCube[1] - 1, nextCube[2]],
                [nextCube[0], nextCube[1], nextCube[2] + 1],
                [nextCube[0], nextCube[1], nextCube[2] - 1]
            ] as [number, number, number][];


            const filteredAdjacencies1 = adjacencies
                .filter(l => !accountedCubes.some(j => j[0] === l[0] && j[1] === l[1] && j[2] === l[2]))
                .filter(l => l.every(j => j >= 0 && j <= bound))
                .filter(l => !input.some(j => j[0] === l[0] && j[1] === l[1] && j[2] === l[2]));

            const filteredDuplicates: [number, number, number][] = [];
            for (let i = 0; i < filteredAdjacencies1.length; i++) {
                const l = filteredAdjacencies1[i];
                const alreadyThere = queue.some(j => j[0] === l[0] && j[1] === l[1] && j[2] === l[2]);
                if (!alreadyThere) {
                    filteredDuplicates.push(l);
                }
            }

            queue.push(...filteredDuplicates);
        }

        accountedCubes.push(...nextCubes);
        nextCubes = queue;
    }

    const newInput = [...input];

    for (let i = 0; i <= bound; i++) {
        for (let j = 0; j <= bound; j++) {
            for (let k = 0; k <= bound; k++) {
                if (!accountedCubes.some(l => l[0] === i && l[1] === j && l[2] === k) && !newInput.some(l => l[0] === i && l[1] === j && l[2] === k)) {
                    newInput.push([i, j, k]);
                }
            }
        }
    }

    return part1(newInput);
};

const main = async () => {
    const input = (await readInput(path.join(__dirname, "./input.txt"), InputMode.Split)).map(l => l.split(",").map(Number) as [number, number, number]);

    console.time("part1");

    console.log(part1(input));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(input));

    console.timeEnd("part2");
};

main();
