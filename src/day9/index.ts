import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

type Input = [string, number][];

const part1 = (input: Input) => {
    let headX = 0;
    let headY = 0;
    let tailX = 0;
    let tailY = 0;
    const visited: [number, number][] = [];
    for (const row of input) {
        for (let i = 0; i < row[1]; i++) {
            if (row[0] === "U") {
                headY++;
            } else if (row[0] === "D") {
                headY--;
            } else if (row[0] === "L") {
                headX--;
            } else if (row[0] === "R") {
                headX++;
            }
            if (tailX <= headX - 2 && tailY === headY) {
                tailX++;
            }
            if (tailX >= headX + 2 && tailY === headY) {
                tailX--
            }
            if (tailY <= headY - 2 && tailX === headX) {
                tailY++;
            }
            if (tailY >= headY + 2 && tailX === headX) {
                tailY--;
            }
            if (tailX <= headX - 2 && tailY > headY) {
                tailX++;
                tailY--;
            }
            if (tailX >= headX + 2 && tailY > headY) {
                tailX--
                tailY--;
            }
            if (tailY <= headY - 2 && tailX > headX) {
                tailY++;
                tailX--;
            }
            if (tailY >= headY + 2 && tailX > headX) {
                tailY--;
                tailX--;
            }
            if (tailX <= headX - 2 && tailY < headY) {
                tailX++;
                tailY++;
            }
            if (tailX >= headX + 2 && tailY < headY) {
                tailX--
                tailY++;
            }
            if (tailY <= headY - 2 && tailX < headX) {
                tailY++;
                tailX++;
            }
            if (tailY >= headY + 2 && tailX < headX) {
                tailY--;
                tailX++;
            }
            // console.log(tailX, tailY);
            if (!visited.some(l => l[0] === tailX && l[1] === tailY)) {
                visited.push([tailX, tailY]);
            }
        }
    }
    return visited.length;
};

const part2 = (input: Input) => {
    let headX = 0;
    let headY = 0;
    const tails = Array(9).fill(null).map(() => [0, 0]);
    const visited: [number, number][] = [[0, 0]];
    for (const row of input) {
        for (let i = 0; i < row[1]; i++) {
            if (row[0] === "U") {
                headY++;
            } else if (row[0] === "D") {
                headY--;
            } else if (row[0] === "L") {
                headX--;
            } else if (row[0] === "R") {
                headX++;
            }
            for (let j = 0; j < tails.length; j++) {
                const prev = j === 0 ? [headX, headY] : tails[j - 1];
                const curr = tails[j];
                if (curr[0] <= prev[0] - 2 && curr[1] === prev[1]) {
                    curr[0]++;
                }
                if (curr[0] >= prev[0] + 2 && curr[1] === prev[1]) {
                    curr[0]--
                }
                if (curr[1] <= prev[1] - 2 && curr[0] === prev[0]) {
                    curr[1]++;
                }
                if (curr[1] >= prev[1] + 2 && curr[0] === prev[0]) {
                    curr[1]--;
                }
                if (curr[0] <= prev[0] - 2 && curr[1] > prev[1]) {
                    curr[0]++;
                    curr[1]--;
                }
                if (curr[0] >= prev[0] + 2 && curr[1] > prev[1]) {
                    curr[0]--
                    curr[1]--;
                }
                if (curr[1] <= prev[1] - 2 && curr[0] > prev[0]) {
                    curr[1]++;
                    curr[0]--;
                }
                if (curr[1] >= prev[1] + 2 && curr[0] > prev[0]) {
                    curr[1]--;
                    curr[0]--;
                }
                if (curr[0] <= prev[0] - 2 && curr[1] < prev[1]) {
                    curr[0]++;
                    curr[1]++;
                }
                if (curr[0] >= prev[0] + 2 && curr[1] < prev[1]) {
                    curr[0]--
                    curr[1]++;
                }
                if (curr[1] <= prev[1] - 2 && curr[0] < prev[0]) {
                    curr[1]++;
                    curr[0]++;
                }
                if (curr[1] >= prev[1] + 2 && curr[0] < prev[0]) {
                    curr[1]--;
                    curr[0]++;
                }

                if (j === 8 && !visited.some(l => l[0] === curr[0] && l[1] === curr[1])) {
                    visited.push([curr[0], curr[1]] as [number, number]);
                }
            }
        }
    }
    return visited.length;
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed: Input = input.map(l => [l.split(" ")[0], Number(l.split(" ")[1])]);

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
