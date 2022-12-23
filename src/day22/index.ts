import { wrap } from "module";
import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
    let l = array.length;
    while (l--) {
        if (predicate(array[l], l, array))
            return l;
    }
    return -1;
}

const part1 = (board: number[][], movement: Instruction[]) => {
    const startingTile = [board[0].findIndex(l => l === 1), 0];
    let dir = 0;

    for (const instr of movement) {
        if (instr.type === "straight") {
            for (let i = 0; i < instr.val; i++) {
                if (dir === 0) {
                    const nextCol = startingTile[0] + 1 >= board[startingTile[1]].length || !board[startingTile[1]][startingTile[0] + 1]
                        ? board[startingTile[1]].findIndex(l => Boolean(l))
                        : startingTile[0] + 1;
                    if (board[startingTile[1]][nextCol] === 2) {
                        break;
                    } else {
                        startingTile[0] = nextCol;
                    }
                } else if (dir === 1) {
                    const nextRow = startingTile[1] + 1 >= board.length || !board[startingTile[1] + 1][startingTile[0]]
                        ? board.findIndex(l => Boolean(l[startingTile[0]]))
                        : startingTile[1] + 1;
                    if (board[nextRow][startingTile[0]] === 2) {
                        break;
                    } else {
                        startingTile[1] = nextRow;
                    }
                } else if (dir === 2) {
                    const nextCol = startingTile[0] - 1 < 0 || !board[startingTile[1]][startingTile[0] - 1]
                        ? findLastIndex(board[startingTile[1]], l => Boolean(l))
                        : startingTile[0] - 1;
                    if (board[startingTile[1]][nextCol] === 2) {
                        break;
                    } else {
                        startingTile[0] = nextCol;
                    }
                } else if (dir === 3) {
                    const nextRow = startingTile[1] - 1 < 0 || !board[startingTile[1] - 1][startingTile[0]]
                        ? findLastIndex(board, l => Boolean(l[startingTile[0]]))
                        : startingTile[1] - 1;
                    if (board[nextRow][startingTile[0]] === 2) {
                        break;
                    } else {
                        startingTile[1] = nextRow;
                    }
                }
            }
        } else {
            if (instr.val === "R") {
                dir++;
                dir = dir % 4;
            } else {
                dir += 3;
                dir = dir % 4;
            }
        }
    }

    return (1000 * (startingTile[1] + 1)) + (4 * (startingTile[0] + 1)) + dir;
};

type WrappingRule = [[number, number], (val: [number, number]) => [[number, number], number]];

const wrappingRules: WrappingRule[][] = [
    [
        [[Infinity,  50], ([x, y]) => [[99,  149 - y], 2]],
        [[Infinity, 100], ([x, y]) => [[y + 50,   49], 3]],
        [[Infinity, 150], ([x, y]) => [[149,   149-y], 2]],
        [[Infinity, 200], ([x, y]) => [[y - 100, 149], 3]]
    ],
    [
        [[50,  Infinity], ([x, y]) => [[x + 100,   0], 1]],
        [[100, Infinity], ([x, y]) => [[49,  x + 100], 2]],
        [[150, Infinity], ([x, y]) => [[99,   x - 50], 2]]
    ],
    [
        [[Infinity,  50], ([x, y]) => [[0,   149 - y], 0]],
        [[Infinity, 100], ([x, y]) => [[y - 50,  100], 1]],
        [[Infinity, 150], ([x, y]) => [[50,  149 - y], 0]],
        [[Infinity, 200], ([x, y]) => [[y - 100,   0], 1]],
    ],
    [
        [[50,  Infinity], ([x, y]) => [[50,   x + 50], 0]],
        [[100, Infinity], ([x, y]) => [[0,   x + 100], 0]],
        [[150, Infinity], ([x, y]) => [[x - 100, 199], 3]],
    ]
];

const part2 = (board: number[][], movement: Instruction[]) => {
    let startingTile: [number, number] = [board[0].findIndex(l => l === 1), 0];
    let dir = 0;

    for (const instr of movement) {
        if (instr.type === "straight") {
            for (let i = 0; i < instr.val; i++) {
                let nextPos: [number, number] = [startingTile[0], startingTile[1]];
                if (dir === 0) {
                    nextPos[0]++;
                } else if (dir === 1) {
                    nextPos[1]++;
                } else if (dir === 2) {
                    nextPos[0]--;
                } else if (dir === 3) {
                    nextPos[1]--;
                }
                if (board[nextPos[1]]?.[nextPos[0]] === 2) break;
                if (!board[nextPos[1]]?.[nextPos[0]]) {
                    const dirSet = wrappingRules[dir];
                    const matchingWrapRule = dirSet.find(([l]) => l[0] > nextPos[0] && l[1] > nextPos[1])!;
                    const newPos = matchingWrapRule[1](nextPos);
                    nextPos = newPos[0];
                    if (board[nextPos[1]]?.[nextPos[0]] === 2) break;
                    dir = newPos[1];
                }
                startingTile = nextPos;
            }
        } else {
            if (instr.val === "R") {
                dir++;
                dir = dir % 4;
            } else {
                dir += 3;
                dir = dir % 4;
            }
        }
    }

    return (1000 * (startingTile[1] + 1)) + (4 * (startingTile[0] + 1)) + dir;
};

const boardVals: Record<string, number> = {
    " ": 0,
    ".": 1,
    "#": 2
}

type StraightInstruction = { type: "straight", val: number };
type TurnInstruction = { type: "turn", val: "R" | "L" };
type Instruction = StraightInstruction | TurnInstruction;

const main = async () => {
    const input = (await readInput(path.join(__dirname, "./input.txt"), InputMode.Raw)).split("\n\n");
    const board = input[0].split("\n").map(l => l.split("").map(j => boardVals[j]));
    const movement = input[input.length-1]
        .match(/\d+|[A-Z]/g)
        ?.map(instr => {
            if (instr.match(/\d+/))
                return { type: "straight", val: Number(instr) };
            return { type: "turn", val: instr };
        }) as Instruction[];

    console.time("part1");

    console.log(part1(board, movement));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(board, movement));

    console.timeEnd("part2");
};

main();
