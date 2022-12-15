import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

type Sensor = {
    x: number;
    y: number;
    closestX: number;
    closestY: number;
}

const part1 = (input: Sensor[]) => {
    const distances: Map<Sensor, number> = new Map<Sensor, number>();

    for (const thing of input) {
        distances.set(thing, Math.abs(thing.closestX - thing.x) + Math.abs(thing.closestY - thing.y));
    }

    const minX = Math.min(...input.map(l => l.x - distances.get(l)!));
    const maxX = Math.max(...input.map(l => l.x + distances.get(l)!));

    const row = 2000000;
    let valid = 0;
    for (let i = minX; i < maxX; i++) {
        for (const sensor of input) {
            const dist = Math.abs(sensor.x - i) + Math.abs(sensor.y - row);
            if (sensor.closestX === i && sensor.closestY === row) continue;
            if (dist <= distances.get(sensor)!) {
                valid += 1;
                break;
            }
        }
    }

    return valid;
};

const part2 = (input: Sensor[]) => {
    const distances: Map<Sensor, number> = new Map<Sensor, number>();

    for (const thing of input) {
        distances.set(thing, Math.abs(thing.closestX - thing.x) + Math.abs(thing.closestY - thing.y));
    }

    const overlappingRegions: [number, number][] = [];
    const gappedRegions: [number, number][] = [];

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            const sensor1 = input[i];
            const sensor2 = input[j];
            if (sensor1 === sensor2) continue;
            const totalDist = Math.abs(sensor2.y - sensor1.y) + Math.abs(sensor2.x - sensor1.x);
            const partwiseDist = distances.get(sensor1)! + distances.get(sensor2)!;
            if (totalDist <= partwiseDist && !overlappingRegions.some(l => l[0] === Math.min(i, j) && l[1] === Math.max(i, j))) {
                overlappingRegions.push([Math.min(i, j), Math.max(i, j)]);
            }
            if (totalDist === partwiseDist + 2 && !gappedRegions.some(l => l[0] === Math.min(i, j) && l[1] === Math.max(i, j))) {
                gappedRegions.push([Math.min(i, j), Math.max(i, j)]);
            }
        }
    }

    for (let i = 0; i < gappedRegions.length; i++) {
        for (let j = i + 1; j < gappedRegions.length; j++) {
            const pair1 = gappedRegions[i];
            const pair2 = gappedRegions[j];

            if (overlappingRegions.some(l => l.includes(pair1[0]) && l.includes(pair2[0])) && overlappingRegions.some(l => l.includes(pair1[1]) && l.includes(pair2[1]))
             && overlappingRegions.some(l => l.includes(pair1[0]) && l.includes(pair2[1])) && overlappingRegions.some(l => l.includes(pair1[1]) && l.includes(pair2[0]))) {
                const point1 = input[pair1[0]];
                const point2 = input[pair1[1]];
                const point3 = input[pair2[0]];
                const point4 = input[pair2[1]];

                const edges: [number, number][] = [];

                for (const sensor of [point1, point2, point3, point4]) {
                    const dist = distances.get(sensor)!;
                    const edgeDist = dist + 1;
                    for (let i = -edgeDist; i <= edgeDist; i++) {
                        edges.push([sensor.x + (edgeDist - Math.abs(i)), sensor.y + i]);
                        if (edgeDist - Math.abs(i) !== 0) {
                            edges.push([sensor.x - (edgeDist - Math.abs(i)), sensor.y + i]);
                        }
                    }
                }

                const min = 0;
                const max = 4000000;

                for (const [i, j] of edges) {
                    if (i < min || j < min || i > max || j > max) continue;
                    let isValid = true;
                    for (const sensor of input) {
                        const dist = Math.abs(sensor.x - i) + Math.abs(sensor.y - j);
                        if (sensor.closestX === i && sensor.closestY === j) {
                            isValid = false;
                            break;
                        }
                        if (dist <= distances.get(sensor)!) {
                            isValid = false;
                            break;
                        }
                    }
                    if (isValid) {
                        return i * 4000000 + j;
                    }
                }
            }
        }
    }
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed = input.map(l => {
        const shit = l.split("Sensor at ")[1].split(":")[0];
        const stuff2 = l.split("closest beacon is at ")[1];
        return {
            x: shit.split(", ").map(l => l.slice(2)).map(Number)[0],
            y: shit.split(", ").map(l => l.slice(2)).map(Number)[1],
            closestX: stuff2.split(", ").map(l => l.slice(2)).map(Number)[0],
            closestY: stuff2.split(", ").map(l => l.slice(2)).map(Number)[1]
        }
    });

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
