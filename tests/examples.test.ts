// One test for each example in examples/: run it, and compare what it prints
// with the output file beside it, which the docs show too. A new example and
// its .out.txt file are tested with no change here.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

const examples = readdirSync("examples").filter((name) => name.endsWith(".ts"));

for (const example of examples) {
  void test(`${example} prints what its .out.txt file says`, () => {
    const printed = execFileSync(process.execPath, [`examples/${example}`], { encoding: "utf8" });
    const expected = readFileSync(`examples/${example.replace(/\.ts$/, ".out.txt")}`, "utf8");
    assert.equal(lf(printed), lf(expected));
  });
}

// A Windows checkout may have CRLF line endings in the output files.
function lf(text: string): string {
  return text.replace(/\r\n/g, "\n");
}
