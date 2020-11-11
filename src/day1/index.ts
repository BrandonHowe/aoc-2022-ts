import * as path from "path";
import { InputFlags, readInput } from "../helpers/readInput";

const main = async () => {
    const input = await readInput(
        path.join(__dirname, "./input.txt"),
        InputFlags.SplitNumbers
    );

    console.time("main");

    console.timeEnd("main");
};

main();
