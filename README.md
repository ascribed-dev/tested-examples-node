# Tested examples: Node with TypeScript

A repository to copy for docs whose code examples say what they were tested with. Its docs, built with [Ascribe](https://ascribed-dev.com), show each example and the output it prints, and each code block names the versions of Node and TypeScript its example passed under. When an example changes and nobody tests it again, the line goes away and `ascribe check` says so.

| Path | What it is |
|---|---|
| `examples/` | Each example, a plain program in a file, and beside it the output it prints, `<name>.out.txt` |
| `tests/examples.test.ts` | One test for each example: run it, and compare what it prints with its output file |
| `ascribe.examples.toml` | Which files are examples, the command that tests them, and what to note about where it ran |
| `examples.observations/` | What the test passed, and where: one file for each Node, written by `ascribe observe` |
| `docs/` | The docs: an Ascribe project that shows each example and its output |
| `.github/workflows/examples.yml` | The tests under each Node, a check of the observations, and the docs build, on every pull request and weekly |

Nothing here is written for Ascribe: the tests are Node's own test runner, and `ascribe observe` writes the observations.

## Run it

```sh
npm ci
npm test                                    # type-check, then run each example
npx ascribe observe --name node-24          # under Node 24: test, then write examples.observations/node-24.toml
npx ascribe build --config docs             # the docs, each code block with its tested line
```

`ascribe observe` runs the `test` line of `ascribe.examples.toml` as shell, as you, and writes the observation only when it passes. Run it once under each Node, with that Node's name: `node-22` and `node-24` here. Commit what it writes, as you would a lockfile.

## Add an example

1. Write `examples/<name>.ts`, with the part the docs show between `// :snippet-start: <tag>` and `// :snippet-end:`.
2. Write what it prints in `examples/<name>.out.txt`. `npm test` runs it and compares.
3. Show both on a page under `docs/content/`:

   ```md
   @snippet: code:examples/<name>.ts#<tag>

   @snippet {lang=text}: code:examples/<name>.out.txt
   ```

4. Run `npx ascribe observe --name node-22` under Node 22, and `--name node-24` under Node 24, and commit the two observations with the example.

An edit to an example without step 4 fails this repository's CI, at `ascribe observe --check`, which runs nothing and says which observation no longer matches. Locally, `npx ascribe check --config docs` reports `example-stale` at the `@snippet` line.

## Docs in another repository

Here the docs are beside the examples, and `docs/ascribe.toml` reads them through a source whose `path` is `..`. When your docs live in another repository, that source names this one instead, and the observations travel with the examples:

```toml
[sources.code]
git = "https://github.com/<you>/<this repository>.git"
branch = "main"
include = ["examples/**"]
```

Then `ascribe sources update` in the docs repository copies the examples and their observations, and says which went stale. The config and the observations stay here, and `ascribe observe` runs here. See [Show what an example was tested with](https://ascribed-dev.com/docs/examples/tested/).

## Ascribe's version

`package.json` pins `@ascribed/cli`. Move it to a new release with `npm install -D @ascribed/cli@<version>`. The observations stay current: an observation records the `ascribe` that wrote it, and goes stale only when an example changes.
