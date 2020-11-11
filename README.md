# Advent of Code Template TS

This is a template for Advent of Code, written in TypeScript.

## How to use

For each day, navigate to the respective folder in `src`.
* Place your input for each day in `input.txt`.
* Place your code in `index.ts`, between lines 10 and 12.

You can change how the input is parsed via the `InputFlags` enum.
* Nothing - leaves the input as-is with no modifications
* SplitRows - splits the rows and returns an array of strings
* SplitNumbers - splits the rows, but parses them as numbers and returns an array of numbers
* Grid - splits the rows, and then splits the rows into columns
