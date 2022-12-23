import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

type Input = ("." | "#")[][];

const getGridVal = (grid: [number, number][], x: number, y: number) => {
    return !grid.some(l => l[0] === x && l[1] === y);
}

const part1 = (input: Input) => {
    let locations: [number, number][] = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === "#") locations.push([i, j]);
        }
    }
    let dir = 0;

    const checkDirection = (grid: [number, number][], i: number, j: number, rawDir: number) => {
        const dir = rawDir % 4;
        if (dir === 0) {
            return getGridVal(grid, i - 1, j) && getGridVal(grid, i - 1, j - 1) && getGridVal(grid, i - 1, j + 1);
        } else if (dir === 1) {
            return getGridVal(grid, i + 1, j) && getGridVal(grid, i + 1, j - 1) && getGridVal(grid, i + 1, j + 1);
        } else if (dir === 2) {
            return getGridVal(grid, i, j - 1) && getGridVal(grid, i - 1, j - 1) && getGridVal(grid, i + 1, j - 1);
        } else if (dir === 3) {
            return getGridVal(grid, i, j + 1) && getGridVal(grid, i - 1, j + 1) && getGridVal(grid, i + 1, j + 1);
        }
    }

    const dirFuncs: ((val: [number, number]) => [number, number])[] = [
        ([i, j]) => [i - 1, j],
        ([i, j]) => [i + 1, j],
        ([i, j]) => [i, j - 1],
        ([i, j]) => [i, j + 1],
    ]

    const getProposition = (grid: [number, number][]) => {
        const props: [[number, number], [number, number]][] = [];
        for (const loc of locations) {
            const [i, j] = loc;
            if (getGridVal(grid, i - 1, j) && getGridVal(grid, i - 1, j - 1) && getGridVal(grid, i - 1, j + 1)
            && getGridVal(grid, i, j - 1) && getGridVal(grid, i, j + 1)
            && getGridVal(grid, i + 1, j) && getGridVal(grid, i + 1, j - 1) && getGridVal(grid, i + 1, j + 1)) {
                props.push([loc, [i, j]]);
            } else if (checkDirection(grid, i, j, dir)) {
                props.push([loc, dirFuncs[(dir) % 4]([i, j])]);
            } else if (checkDirection(grid, i, j, dir + 1)) {
                props.push([loc, dirFuncs[(dir + 1) % 4]([i, j])]);
            } else if (checkDirection(grid, i, j, dir + 2)) {
                props.push([loc, dirFuncs[(dir + 2) % 4]([i, j])]);
            } else if (checkDirection(grid, i, j, dir + 3)) {
                props.push([loc, dirFuncs[(dir + 3) % 4]([i, j])]);
            } else {
                props.push([loc, [i, j]]);
            }
        }
        return props;
    }

    const move = (locations: [number, number][]) => {
        const proposals = getProposition(locations);
        const newLocs = [];

        const propRecord: Record<string, number> = {};
        for (const cell of proposals) {
            if (`${cell[1][0]}|${cell[1][1]}` in propRecord) {
                propRecord[`${cell[1][0]}|${cell[1][1]}`]++;
            } else {
                propRecord[`${cell[1][0]}|${cell[1][1]}`] = 1;
            }
        }

        for (const cell of proposals) {
            const hasDuplicate = propRecord[`${cell[1][0]}|${cell[1][1]}`] > 1;
            if (hasDuplicate) {
                newLocs.push(cell[0]);
            } else {
                newLocs.push(cell[1]);
            }
        }

        return newLocs;
    }

    let lastLocationStr = "";
    let locationStr = JSON.stringify(locations);
    while (locationStr !== lastLocationStr) {
        const newLocations = move(locations);
        lastLocationStr = locationStr;
        locations = newLocations;
        locationStr = JSON.stringify(locations);
        dir++;
    }

    const minX = Math.min(...locations.map(l => l[0]));
    const maxX = Math.max(...locations.map(l => l[0]));
    const minY = Math.min(...locations.map(l => l[1]));
    const maxY = Math.max(...locations.map(l => l[1]));

    return (maxX - minX + 1) * (maxY - minY + 1) - locations.length;
};

const part2 = (input: Input) => {
    let locations: [number, number][] = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === "#") locations.push([i, j]);
        }
    }
    let dir = 0;

    const checkDirection = (grid: [number, number][], i: number, j: number, rawDir: number) => {
        const dir = rawDir % 4;
        if (dir === 0) {
            return getGridVal(grid, i - 1, j) && getGridVal(grid, i - 1, j - 1) && getGridVal(grid, i - 1, j + 1);
        } else if (dir === 1) {
            return getGridVal(grid, i + 1, j) && getGridVal(grid, i + 1, j - 1) && getGridVal(grid, i + 1, j + 1);
        } else if (dir === 2) {
            return getGridVal(grid, i, j - 1) && getGridVal(grid, i - 1, j - 1) && getGridVal(grid, i + 1, j - 1);
        } else if (dir === 3) {
            return getGridVal(grid, i, j + 1) && getGridVal(grid, i - 1, j + 1) && getGridVal(grid, i + 1, j + 1);
        }
    }

    const dirFuncs: ((val: [number, number]) => [number, number])[] = [
        ([i, j]) => [i - 1, j],
        ([i, j]) => [i + 1, j],
        ([i, j]) => [i, j - 1],
        ([i, j]) => [i, j + 1],
    ]

    const getProposition = (grid: [number, number][]) => {
        const props: [[number, number], [number, number]][] = [];
        for (const loc of locations) {
            const [i, j] = loc;
            if (getGridVal(grid, i - 1, j) && getGridVal(grid, i - 1, j - 1) && getGridVal(grid, i - 1, j + 1)
            && getGridVal(grid, i, j - 1) && getGridVal(grid, i, j + 1)
            && getGridVal(grid, i + 1, j) && getGridVal(grid, i + 1, j - 1) && getGridVal(grid, i + 1, j + 1)) {
                props.push([loc, [i, j]]);
            } else if (checkDirection(grid, i, j, dir)) {
                props.push([loc, dirFuncs[(dir) % 4]([i, j])]);
            } else if (checkDirection(grid, i, j, dir + 1)) {
                props.push([loc, dirFuncs[(dir + 1) % 4]([i, j])]);
            } else if (checkDirection(grid, i, j, dir + 2)) {
                props.push([loc, dirFuncs[(dir + 2) % 4]([i, j])]);
            } else if (checkDirection(grid, i, j, dir + 3)) {
                props.push([loc, dirFuncs[(dir + 3) % 4]([i, j])]);
            } else {
                props.push([loc, [i, j]]);
            }
        }
        return props;
    }

    const move = (locations: [number, number][]) => {
        const proposals = getProposition(locations);
        const newLocs = [];

        const propRecord: Record<string, number> = {};
        for (const cell of proposals) {
            if (`${cell[1][0]}|${cell[1][1]}` in propRecord) {
                propRecord[`${cell[1][0]}|${cell[1][1]}`]++;
            } else {
                propRecord[`${cell[1][0]}|${cell[1][1]}`] = 1;
            }
        }

        for (const cell of proposals) {
            const hasDuplicate = propRecord[`${cell[1][0]}|${cell[1][1]}`] > 1;
            if (hasDuplicate) {
                newLocs.push(cell[0]);
            } else {
                newLocs.push(cell[1]);
            }
        }

        return newLocs;
    }

    let lastLocationStr = "";
    let locationStr = JSON.stringify(locations);
    while (locationStr !== lastLocationStr) {
        const newLocations = move(locations);
        lastLocationStr = locationStr;
        locations = newLocations;
        locationStr = JSON.stringify(locations);
        dir++;
    }

    return dir;
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Grid) as Input;

    console.time("part1");

    console.log(part1(input));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(input));

    console.timeEnd("part2");
};

main();
