import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

type Blizzard = {
    x: number;
    y: number;
    dir: number;
}

const part1 = (grid: number[][], rawBlizzards: Blizzard[]) => {
    let blizzards = rawBlizzards.map(l => ({...l}));

    const moveBlizzard = (locs: Blizzard[]) => {
        const newLocs = [];
        for (const loc of locs) {
            const newLoc = { x: loc.x, y: loc.y, dir: loc.dir };
            if (loc.dir === 0) newLoc.x++;
            if (loc.dir === 1) newLoc.y++;
            if (loc.dir === 2) newLoc.x--;
            if (loc.dir === 3) newLoc.y--;
            if (loc.dir === 0 && grid[newLoc.y][newLoc.x] === 1) {
                newLoc.x = 1;
            }
            if (loc.dir === 1 && grid[newLoc.y][newLoc.x] === 1) {
                newLoc.y = 1;
            }
            if (loc.dir === 2 && grid[newLoc.y][newLoc.x] === 1) {
                newLoc.x = grid[newLoc.y].length - 2;
            }
            if (loc.dir === 3 && grid[newLoc.y][newLoc.x] === 1) {
                newLoc.y = grid.length - 2;
            }
            newLocs.push(newLoc);
        }
        return newLocs;
    }

    let currentLocs = [[0, 1]];
    let nextLocs: [number, number][] = [];
    let round = 0;

    while (true) {
        // console.log(round, currentLocs.length);
        blizzards = moveBlizzard(blizzards);
        for (const pos of currentLocs) {
            const possiblePositions = [
                [pos[0], pos[1]],
                [pos[0] + 1, pos[1]],
                [pos[0] - 1, pos[1]],
                [pos[0], pos[1] + 1],
                [pos[0], pos[1] - 1]
            ].filter(l => grid[l[0]]?.[l[1]] === 0 && !blizzards.some(j => j.x === l[1] && j.y === l[0])) as [number, number][];
            for (const newPos of possiblePositions) {
                if (!nextLocs.some(l => l[0] === newPos[0] && l[1] === newPos[1])) {
                    nextLocs.push(newPos);
                }
            }
        }
        currentLocs = nextLocs;
        nextLocs = [];
        round++;
        if (currentLocs.some(l => l[0] === grid.length - 1 && l[1] === grid[0].length - 2)) return round;
    }
};

const part2 = (grid: number[][], rawBlizzards: Blizzard[]) => {
    let blizzards = rawBlizzards.map(l => ({...l}));

    const moveBlizzard = (locs: Blizzard[]) => {
        const newLocs = [];
        for (const loc of locs) {
            const newLoc = { x: loc.x, y: loc.y, dir: loc.dir };
            if (loc.dir === 0) newLoc.x++;
            if (loc.dir === 1) newLoc.y++;
            if (loc.dir === 2) newLoc.x--;
            if (loc.dir === 3) newLoc.y--;
            if (loc.dir === 0 && grid[newLoc.y][newLoc.x] === 1) {
                newLoc.x = 1;
            }
            if (loc.dir === 1 && grid[newLoc.y][newLoc.x] === 1) {
                newLoc.y = 1;
            }
            if (loc.dir === 2 && grid[newLoc.y][newLoc.x] === 1) {
                newLoc.x = grid[newLoc.y].length - 2;
            }
            if (loc.dir === 3 && grid[newLoc.y][newLoc.x] === 1) {
                newLoc.y = grid.length - 2;
            }
            newLocs.push(newLoc);
        }
        return newLocs;
    }

    let currentLocs = [[0, 1]];
    let nextLocs: [number, number][] = [];
    let round = 0;

    while (true) {
        // console.log(round, currentLocs.length);
        blizzards = moveBlizzard(blizzards);
        for (const pos of currentLocs) {
            const possiblePositions = [
                [pos[0], pos[1]],
                [pos[0] + 1, pos[1]],
                [pos[0] - 1, pos[1]],
                [pos[0], pos[1] + 1],
                [pos[0], pos[1] - 1]
            ].filter(l => grid[l[0]]?.[l[1]] === 0 && !blizzards.some(j => j.x === l[1] && j.y === l[0])) as [number, number][];
            for (const newPos of possiblePositions) {
                if (!nextLocs.some(l => l[0] === newPos[0] && l[1] === newPos[1])) {
                    nextLocs.push(newPos);
                }
            }
        }
        currentLocs = nextLocs;
        nextLocs = [];
        round++;
        if (currentLocs.some(l => l[0] === grid.length - 1 && l[1] === grid[0].length - 2)) break;
    }

    currentLocs = [[grid.length - 1, grid[0].length - 2]];
    nextLocs = [];

    while (true) {
        // console.log(round, currentLocs.length);
        blizzards = moveBlizzard(blizzards);
        for (const pos of currentLocs) {
            const possiblePositions = [
                [pos[0], pos[1]],
                [pos[0] + 1, pos[1]],
                [pos[0] - 1, pos[1]],
                [pos[0], pos[1] + 1],
                [pos[0], pos[1] - 1]
            ].filter(l => grid[l[0]]?.[l[1]] === 0 && !blizzards.some(j => j.x === l[1] && j.y === l[0])) as [number, number][];
            for (const newPos of possiblePositions) {
                if (!nextLocs.some(l => l[0] === newPos[0] && l[1] === newPos[1])) {
                    nextLocs.push(newPos);
                }
            }
        }
        currentLocs = nextLocs;
        nextLocs = [];
        round++;
        if (currentLocs.some(l => l[0] === 0 && l[1] === 1)) break;
    }

    currentLocs = [[0, 1]];
    nextLocs = [];

    while (true) {
        blizzards = moveBlizzard(blizzards);
        for (const pos of currentLocs) {
            const possiblePositions = [
                [pos[0], pos[1]],
                [pos[0] + 1, pos[1]],
                [pos[0] - 1, pos[1]],
                [pos[0], pos[1] + 1],
                [pos[0], pos[1] - 1]
            ].filter(l => grid[l[0]]?.[l[1]] === 0 && !blizzards.some(j => j.x === l[1] && j.y === l[0])) as [number, number][];
            for (const newPos of possiblePositions) {
                if (!nextLocs.some(l => l[0] === newPos[0] && l[1] === newPos[1])) {
                    nextLocs.push(newPos);
                }
            }
        }
        currentLocs = nextLocs;
        nextLocs = [];
        round++;
        if (currentLocs.some(l => l[0] === grid.length - 1 && l[1] === grid[0].length - 2)) break;
    }

    return round;
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Grid);
    const grid = input.map(l => l.map(j => j === "#" ? 1 : 0));
    const blizzards = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === ">") {
                blizzards.push({ x: j, y: i, dir: 0 });
            }
            if (input[i][j] === "v") {
                blizzards.push({ x: j, y: i, dir: 1 });
            }
            if (input[i][j] === "<") {
                blizzards.push({ x: j, y: i, dir: 2 });
            }
            if (input[i][j] === "^") {
                blizzards.push({ x: j, y: i, dir: 3 });
            }
        }
    }

    console.time("part1");

    console.log(part1(grid, blizzards));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(grid, blizzards));

    console.timeEnd("part2");
};

main();
