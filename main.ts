// Real-Life Patch Notes: The Comedy Changelog
// Writes one patch note (one line, 1-160 characters) to <output-dir>/entry.txt.
// Node 22+, standard library only. No network, no secrets, no reading outside this file.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 160 characters,
// not whitespace-only, one line. The entry below is 108 characters, no
// trailing newline, so the file holds exactly the patch note and nothing else.
const ENTRY =
  "v1.9.3: fixed a bug where the brain replayed an embarrassing moment from 2014 at 3 a.m. instead of sleeping.";

function emptyDir(dir) {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main() {
  const outDir = process.argv[2] ?? "/output";
  if (
    ENTRY.length < 1 ||
    ENTRY.length > 160 ||
    ENTRY.trim().length === 0 ||
    ENTRY.includes("\n")
  ) {
    throw new Error("entry fails the 1-160 single-line gate");
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} character(s) to ${join(outDir, "entry.txt")}`);
}

main();
