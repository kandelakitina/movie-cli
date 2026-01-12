import { parseArgs } from "@std/cli/parse-args";

// const OMDB_API_KEY = Deno.env.get("OMDB_API_KEY");

// Args Parsing

const args = parseArgs(Deno.args);

const movie = args._[0];

console.log(movie);
