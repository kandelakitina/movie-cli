import { parseArgs } from "@std/cli/parse-args";
import { green, red } from "@std/fmt/colors";
import { dedent } from "@std/text/unstable-dedent";

const OMDB_API_KEY = Deno.env.get("OMDB_API_KEY");
const BASE_URI = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`;

// Args Parsing

const args = parseArgs(Deno.args, {
  string: [
    "_", // treat all positional args as strings
    "movie",
  ],
  boolean: ["help"],
  alias: {
    h: "help",
    m: "movie",
  },
});

// Helpers

function printMessage(message: string): void {
  console.log(green(message));
}

function printError(message: string): void {
  console.log(red(message));
}

function printHelp() {
  console.log(dedent`
    Just type a movie name in any of the following formats:

    movie-cli Terminator 2
    movie-cli "Terminator 2"
    movie-cli -m Terminator 2
  `);
}

function printMovie(movie: Movie) {
  printMessage(dedent`
      Movie: ${movie.title}
      Actors: ${movie.actors}
      IMDB Rating: ${movie.imdbRating}
    `);
}

// API Fetcher

interface Movie {
  title: string;
  actors: string;
  imdbRating: string | number;
}

async function getMovie(name: string): Promise<Movie> {
  printMessage(dedent`
      Fetching info for the movie ${name}
    `);

  const params = new URLSearchParams({
    t: String(name),
  });

  const res = await fetch(`${BASE_URI}${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Movie request failed (${res.status})`);
  }

  const data = await res.json();

  return {
    title: data.title,
    actors: data.actors,
    imdbRating: data.imdbRating,
  };
}

// Main flow

const movie = args.movie ?? args._.join(" ");

if (!movie) {
  printError("Movie name is required");
  Deno.exit(1);
}

if (args.help) {
  printHelp();
  Deno.exit(0);
}

try {
  const result = await getMovie(movie);
  printMovie(result);
} catch (err) {
  printError(err instanceof Error ? err.message : "Unknown error");
}
