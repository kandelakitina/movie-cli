import { parseArgs } from "@std/cli/parse-args";

// const OMDB_API_KEY = Deno.env.get("OMDB_API_KEY");

// Args Parsing

const args = parseArgs(Deno.args, {
  string: ["_"], // treat all positional args as strings
});

const movie = args._.join(" ");

console.log(movie);
