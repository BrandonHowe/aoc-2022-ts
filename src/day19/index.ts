import * as path from "path";
import readInput, { InputMode } from "../helpers/readInput";

type Blueprint = {
    ore: number;
    clay: number;
    obbyOre: number;
    obbyClay: number;
    geodeOre: number;
    geodeObby: number;
}

type World = {
    ore: number;
    clay: number;
    obby: number;
    geodes: number;
    remaining: number;
    oreRobots: number;
    clayRobots: number;
    obbyRobots: number;
    geodeRobots: number;
    refusedToBuyOre: boolean;
    refusedToBuyClay: boolean;
    refusedToBuyObby: boolean;
}

const optimizeBlueprint = (blueprint: Blueprint, time: number) => {
    const initialWorld: World = {
        ore: 0,
        clay: 0,
        obby: 0,
        geodes: 0,
        remaining: time,
        oreRobots: 1,
        clayRobots: 0,
        obbyRobots: 0,
        geodeRobots: 0,
        refusedToBuyOre: false,
        refusedToBuyClay: false,
        refusedToBuyObby: false
    };

    let pastOptions = [initialWorld];

    while (pastOptions.some(l => l.remaining)) {
        const highestGeodes = pastOptions.reduce((acc, cur) => acc > cur.geodes ? acc : cur.geodes, 0);
        let newOptions: World[] = [];
        for (const option of pastOptions) {
            let newBranches: World[] = [];
            const base = { ...option };
            const oreByEnd = base.ore + (base.oreRobots * base.remaining);
            const clayByEnd = base.clay + (base.clayRobots * base.remaining);
            const obbyByEnd = base.obby + (base.obbyRobots * base.remaining);
            const baseCopy = { ...base };
            newBranches.push(baseCopy);
            // if (base.remaining > 0 && base.geodes + base.geodeRobots * (base.remaining + 1000) < highestGeodes) continue;
            if (base.obby >= blueprint.geodeObby && base.ore >= blueprint.geodeOre) {
                newBranches.pop();
                newBranches.push({
                    ...base,
                    ore: base.ore - blueprint.geodeOre,
                    obby: base.obby - blueprint.geodeObby,
                    geodes: base.geodes + base.remaining - 1,
                    refusedToBuyObby: false,
                    refusedToBuyClay: false,
                    refusedToBuyOre: false
                });
            } else if (base.remaining > 1) {
                const highestOreCost = Math.max(blueprint.ore, blueprint.clay, blueprint.geodeOre, blueprint.obbyOre);
                if (!base.refusedToBuyObby
                    && base.clay >= blueprint.obbyClay
                    && base.ore >= blueprint.obbyOre
                    && base.obbyRobots <= blueprint.geodeObby
                    && obbyByEnd <= blueprint.geodeObby * base.remaining) {
                    newBranches.push({
                        ...base,
                        ore: base.ore - blueprint.obbyOre,
                        clay: base.clay - blueprint.obbyClay,
                        obbyRobots: base.obbyRobots + 1,
                        refusedToBuyObby: false,
                        refusedToBuyClay: false,
                        refusedToBuyOre: false
                    });
                    baseCopy.refusedToBuyObby = true;
                }
                if (!base.refusedToBuyClay
                    && base.ore >= blueprint.clay
                    && base.clayRobots <= blueprint.obbyClay
                    && clayByEnd <= blueprint.obbyClay * base.remaining) {
                    newBranches.push({
                        ...base,
                        ore: base.ore - blueprint.clay,
                        clayRobots: base.clayRobots + 1,
                        refusedToBuyObby: false,
                        refusedToBuyClay: false,
                        refusedToBuyOre: false
                    });
                    baseCopy.refusedToBuyClay = true;
                }
                if (!base.refusedToBuyOre
                    && base.ore >= blueprint.ore
                    && base.oreRobots <= highestOreCost
                    && oreByEnd <= highestOreCost * base.remaining) {
                    newBranches.push({
                        ...base,
                        ore: base.ore - blueprint.ore,
                        oreRobots: base.oreRobots + 1,
                        refusedToBuyObby: false,
                        refusedToBuyClay: false,
                        refusedToBuyOre: false
                    });
                    baseCopy.refusedToBuyOre = true;
                }
            }

            for (const option of newBranches) {
                option.ore += base.oreRobots;
                option.clay += base.clayRobots;
                option.obby += base.obbyRobots;
                option.geodes += base.geodeRobots;
                option.remaining--;
            }

            newOptions.push(...newBranches);
        }

        pastOptions = newOptions;
    }

    let highest = 0;
    for (const option of pastOptions) {
        if (option.geodes > highest) {
            highest = option.geodes;
        }
    }
    return highest;
}

const part1 = (input: Blueprint[]) => {
    const mapped = input.map(l => optimizeBlueprint(l, 24));
    return mapped.reduce((acc, cur, idx) => acc + cur * (idx + 1), 0);
};

const part2 = (input: Blueprint[]) => {
    const mapped = input.slice(0, 3).map(l => optimizeBlueprint(l, 32));
    return mapped.reduce((acc, cur) => acc * cur, 1);
};

const main = async () => {
    const input = await readInput(path.join(__dirname, "./input.txt"), InputMode.Split);
    const parsed: Blueprint[] = input.map(l => {
        const ore = Number(l.split("Each ore robot costs ")[1].split(" ")[0]);
        const clay = Number(l.split("Each clay robot costs ")[1].split(" ")[0]);
        const obbyOre = Number(l.split("Each obsidian robot costs ")[1].split(" ")[0]);
        const obbyClay = Number(l.split("Each obsidian robot costs ")[1].split(" and ")[1].split(" ")[0]);
        const geodeOre = Number(l.split("Each geode robot costs ")[1].split(" ")[0]);
        const geodeObby = Number(l.split("Each geode robot costs ")[1].split(" and ")[1].split(" ")[0]);
        return { ore, clay, obbyOre, obbyClay, geodeOre, geodeObby };
    });

    console.time("part1");

    console.log(part1(parsed));

    console.timeEnd("part1");

    console.time("part2");

    console.log(part2(parsed));

    console.timeEnd("part2");
};

main();
