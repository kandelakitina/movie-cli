import { parseArgs } from "@std/cli/parse-args";
import { blue, bold, green, red, underline, yellow } from "@std/fmt/colors";
import { dedent } from "@std/text/unstable-dedent";

const OMDB_API_KEY = Deno.env.get("OMDB_API_KEY");

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

if (args.help) {
  printHelp();
  Deno.exit(0);
}

const movie = args.movie ?? args._.join(" ");

if (!movie) {
  printError("Movie name is required");
  Deno.exit(1);
}

const BASE_URI = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`;

try {
  const result = await getMovie(movie);
  printMovie(result);
} catch (err) {
  printError(err instanceof Error ? err.message : "Unknown error");
}

// Helpers

function printMessage(message: string): void {
  console.log(bold(green(`✅ ${message}`)));
}

function printError(message: string): void {
  console.log(bold(red(`❌ ${message}`)));
}

function printHelp() {
  console.log(dedent`
    ${bold(underline(blue("📖 Help: Movie CLI Usage")))}
    ${yellow("Just type a movie name in any of the following formats:")}

    ${green("movie-cli Terminator 2")}
    ${green('movie-cli "Terminator 2"')}
    ${green("movie-cli -m Terminator 2")}
  `);
}

function printMovie(movie: Movie) {
  console.log(dedent`
    🎬 ${bold(blue("Movie:"))} ${bold(yellow(movie.title))}
    👥 ${bold(blue("Actors:"))} ${movie.actors}
    ⭐ ${bold(blue("IMDB Rating:"))} ${bold(green(String(movie.imdbRating)))}
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
    title: data.Title,
    actors: data.Actors,
    imdbRating: data.imdbRating,
  };
}

// Main flow

console.log(bold(blue("🎥 Welcome to OMDB Movie CLI!")));
console.log(); // empty line
