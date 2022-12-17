import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

type Valve = {
    name: string;
    flow: number;
    connected: string[];
}

type Order = {
    nodes: string[];
    timeRemaining: number;
    pressure: number;
}

const part1 = (input: Valve[]) => {
    const timesToMove: Record<string, Record<string, number>> = {};
    const relevantValves = [...input.filter(l => l.flow), input.find(l => l.name === "AA")!];

    const valveDistance = (start: string, end: string) => {
        let currDist = 0;
        let currentValves = [start];
        const seenValves = [];
        if (start === end) return 0;
        while (true) {
            currDist++;
            const newValves = [];
            for (const valve of currentValves) {
                seenValves.push(valve);
                for (const connectedValve of input.find(l => l.name === valve)!.connected) {
                    newValves.push(connectedValve);
                    if (connectedValve === end) {
                        return currDist;
                    }
                }
            }
            currentValves = newValves;
        }
    }

    for (const valve of relevantValves) {
        timesToMove[valve.name] = {};
        for (const dest of relevantValves) {
            timesToMove[valve.name][dest.name] = valveDistance(valve.name, dest.name);
        }
    }

    let relevantOrders: Order[] = [{ nodes: ["AA"], timeRemaining: 30, pressure: 0 }];
    for (let i = 0; i < Math.min(relevantValves.length - 1, 7); i++) {
        let newOrders = [];
        const trulyRelevantOrders = relevantOrders.filter(l => l.timeRemaining > 1);
        for (const order of trulyRelevantOrders) {
            const scores: Record<string, number> = {};
            const trulyRelevant = relevantValves.filter(l => !order.nodes.includes(l.name));
            for (const valve of trulyRelevant) {
                const newRemaining = (order.timeRemaining - timesToMove[order.nodes[order.nodes.length - 1]][valve.name] - 1);
                const score = newRemaining * valve.flow;
                scores[valve.name] = score;
                newOrders.push({
                    nodes: [...order.nodes, valve.name],
                    timeRemaining: newRemaining,
                    pressure: order.pressure + score
                })
            }
        }
        relevantOrders = newOrders;
    }

    let maximumPressure = 0;
    for (const pressure of relevantOrders) {
        if (pressure.pressure > maximumPressure) maximumPressure = pressure.pressure;
    }

    return maximumPressure;
};

const part2 = (input: Valve[]) => {
    const timesToMove: Record<string, Record<string, number>> = {};
    const relevantValves = [...input.filter(l => l.flow), input.find(l => l.name === "AA")!];

    const valveDistance = (start: string, end: string) => {
        let currDist = 0;
        let currentValves = [start];
        const seenValves = [];
        if (start === end) return 0;
        while (true) {
            currDist++;
            const newValves = [];
            for (const valve of currentValves) {
                seenValves.push(valve);
                for (const connectedValve of input.find(l => l.name === valve)!.connected) {
                    newValves.push(connectedValve);
                    if (connectedValve === end) {
                        return currDist;
                    }
                }
            }
            currentValves = newValves;
        }
    }

    for (const valve of relevantValves) {
        timesToMove[valve.name] = {};
        for (const dest of relevantValves) {
            timesToMove[valve.name][dest.name] = valveDistance(valve.name, dest.name);
        }
    }

    let relevantOrders: Order[] = [{ nodes: ["AA"], timeRemaining: 26, pressure: 0 }];
    for (let i = 0; i < Math.min(relevantValves.length - 1, 13); i++) {
        let newOrders = [];
        const trulyRelevantOrders = relevantOrders.filter(l => l.timeRemaining > 1 && l.nodes.length === i + 1);
        for (const order of trulyRelevantOrders) {
            const scores: Record<string, number> = {};
            const trulyRelevant = relevantValves.filter(l => !order.nodes.includes(l.name));
            for (const valve of trulyRelevant) {
                const newRemaining = (order.timeRemaining - timesToMove[order.nodes[order.nodes.length - 1]][valve.name] - 1);
                const score = newRemaining * valve.flow;
                scores[valve.name] = score;
                newOrders.push({
                    nodes: [...order.nodes, valve.name],
                    timeRemaining: newRemaining,
                    pressure: order.pressure + score
                })
            }
        }
        if (newOrders.length === 0) break;
        relevantOrders = relevantOrders.concat(newOrders);
    }

    for (const thing of relevantOrders) {
        thing.nodes.shift();
    }

    let maximumPressure = 0;
    for (let i = 0; i < relevantOrders.length; i++) {
        for (let j = 0; j < i; j++) {
            const o1 = relevantOrders[i];
            const o2 = relevantOrders[j];
            let shouldBreak = false;
            for (const n1 of o1.nodes) {
                if (shouldBreak) break;
                for (const n2 of o2.nodes) {
                    if (n1 === n2) {
                        shouldBreak = true;
                        break;
                    }
                }
            }
            if (shouldBreak) continue;
            // if (o1.nodes.some(l => o2.nodes.includes(l))) {
            //     continue;
            // }
            if (o1.pressure + o2.pressure > maximumPressure) {
                maximumPressure = o1.pressure + o2.pressure;
                console.log("ans", maximumPressure);
            }
        }
    }

    return maximumPressure;
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed = input.map(l => {
        const name = l.slice(6, 8);
        const flow = Number(l.split("=")[1].split(";")[0]);
        const connected = l.split(" ").slice(9).map(l => l.split(",")[0]);
        return { name, flow, connected };
    });

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
