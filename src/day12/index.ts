import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

const part1 = (grid: number[][], starting: [number, number], ending: [number, number]) => {
    const distances: Record<string, number> = {};
    let unvisited: string[] = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            unvisited.push(`${i}|${j}`);
            distances[`${i}|${j}`] = Infinity;
        }
    }
    let current = [...starting];
    distances[`${current[0]}|${current[1]}`] = 0;
    while (unvisited.includes(`${ending[0]}|${ending[1]}`)) {
        const currDistance = distances[`${current[0]}|${current[1]}`];
        const currHeight = grid[current[0]][current[1]];
        if (unvisited.includes(`${current[0] - 1}|${current[1]}`) && grid[current[0] - 1][current[1]] - currHeight <= 1) {
            const tentDist = currDistance + 1;
            if (distances[`${current[0] - 1}|${current[1]}`] > tentDist) {
                distances[`${current[0] - 1}|${current[1]}`] = tentDist;
            }
        }
        if (unvisited.includes(`${current[0] + 1}|${current[1]}`) && grid[current[0] + 1][current[1]] - currHeight <= 1) {
            const tentDist = currDistance + 1;
            if (distances[`${current[0] + 1}|${current[1]}`] > tentDist) {
                distances[`${current[0] + 1}|${current[1]}`] = tentDist;
            }
        }
        if (unvisited.includes(`${current[0]}|${current[1] - 1}`) && grid[current[0]][current[1] - 1] - currHeight <= 1) {
            const tentDist = currDistance + 1;
            if (distances[`${current[0]}|${current[1] - 1}`] > tentDist) {
                distances[`${current[0]}|${current[1] - 1}`] = tentDist;
            }
        }
        if (unvisited.includes(`${current[0]}|${current[1] + 1}`) && grid[current[0]][current[1] + 1] - currHeight <= 1) {
            const tentDist = currDistance + 1;
            if (distances[`${current[0]}|${current[1] + 1}`] > tentDist) {
                distances[`${current[0]}|${current[1] + 1}`] = tentDist;
            }
        }
        unvisited = unvisited.filter(l => l !== `${current[0]}|${current[1]}`);
        const newSmallest = Object.entries(distances).filter(l => unvisited.includes(l[0])).sort((a, b) => a[1] - b[1])[0];
        if (!newSmallest) break;
        current = newSmallest[0].split("|").map(Number) as [number, number];
    }

    return distances[`${ending[0]}|${ending[1]}`];
};

const part2 = (grid: number[][], starting: [number, number], ending: [number, number]) => {
    const distances: Record<string, number> = {};
    let unvisited: string[] = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            unvisited.push(`${i}|${j}`);
            distances[`${i}|${j}`] = Infinity;
        }
    }
    const necessarySpots = Object.keys(distances).filter(l => {
        const coords = l.split("|").map(Number) as [number, number];
        return grid[coords[0]][coords[1]] === 1;
    });
    let current = [...ending];
    distances[`${current[0]}|${current[1]}`] = 0;
    while (unvisited.filter(l => necessarySpots.includes(l)).length !== 0) {
        const currDistance = distances[`${current[0]}|${current[1]}`];
        const currHeight = grid[current[0]][current[1]];
        if (unvisited.includes(`${current[0] - 1}|${current[1]}`) && grid[current[0] - 1][current[1]] - currHeight >= -1) {
            const tentDist = currDistance + 1;
            if (distances[`${current[0] - 1}|${current[1]}`] > tentDist) {
                distances[`${current[0] - 1}|${current[1]}`] = tentDist;
            }
        }
        if (unvisited.includes(`${current[0] + 1}|${current[1]}`) && grid[current[0] + 1][current[1]] - currHeight >= -1) {
            const tentDist = currDistance + 1;
            if (distances[`${current[0] + 1}|${current[1]}`] > tentDist) {
                distances[`${current[0] + 1}|${current[1]}`] = tentDist;
            }
        }
        if (unvisited.includes(`${current[0]}|${current[1] - 1}`) && grid[current[0]][current[1] - 1] - currHeight >= -1) {
            const tentDist = currDistance + 1;
            if (distances[`${current[0]}|${current[1] - 1}`] > tentDist) {
                distances[`${current[0]}|${current[1] - 1}`] = tentDist;
            }
        }
        if (unvisited.includes(`${current[0]}|${current[1] + 1}`) && grid[current[0]][current[1] + 1] - currHeight >= -1) {
            const tentDist = currDistance + 1;
            if (distances[`${current[0]}|${current[1] + 1}`] > tentDist) {
                distances[`${current[0]}|${current[1] + 1}`] = tentDist;
            }
        }
        unvisited = unvisited.filter(l => l !== `${current[0]}|${current[1]}`);
        const newSmallest = Object.entries(distances).filter(l => unvisited.includes(l[0])).sort((a, b) => a[1] - b[1])[0];
        if (!newSmallest) break;
        current = newSmallest[0].split("|").map(Number) as [number, number];
    }

    return Math.min(...Object.entries(distances).filter(l => necessarySpots.includes(l[0])).map(l => l[1]));
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Grid);
    let currentPos: [number, number] = [0, 0];
    let targetPos: [number, number] = [0, 0];
    const parsed: number[][] = [];
    for (let i = 0; i < input.length; i++) {
        const row = input[i];
        const newRow: number[] = [];
        for (let j = 0; j < row.length; j++) {
            const char = row[j];
            if (char === "S") {
                newRow.push(1);
                currentPos = [i, j];
            } else if (char === "E") {
                newRow.push(26);
                targetPos = [i, j];
            } else {
                newRow.push(char.charCodeAt(0) - 96);
            }
        }
        parsed.push(newRow);
    }

    console.time("part1");

    console.log(part1(parsed, currentPos, targetPos));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed, currentPos, targetPos));

    console.timeEnd("part2");
};

main();
