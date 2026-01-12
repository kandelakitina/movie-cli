**Tutorial Task:** Build a CLI app similar to this weather tool, but for fetching movie information using the free OMDB API (http://www.omdbapi.com/). Users will input a movie title, and the app will display details like title, year, director, and plot.

**Step-by-Step Plan with Hints:**

1. **Set up the project:** Create a new Deno project with a main.ts file. Use the same CLI parsing structure (parseArgs from @std/cli). Hint: You'll need an OMDB API key; get one for free at omdbapi.com.

2. **Handle input:** Parse command-line arguments for movie title (positional or --title flag), optional --verbose flag, and --help. Hint: Validate that a title is provided.

3. **Implement API fetch:** Create a function to fetch movie data from OMDB. Use fetch() to call the API endpoint with the title and your API key. Hint: The URL format is like https://www.omdbapi.com/?t=<title>&apikey=<key>.

4. **Parse response:** Extract relevant fields from the JSON response (e.g., Title, Year, Director, Plot). Handle errors if the movie isn't found. Hint: Check the 'Response' field in the API response.

5. **Display output:** Print the movie info in a formatted way, similar to the weather output. Include emojis for visual appeal. Hint: Use console.log with template literals for nice formatting.

6. **Add error handling and testing:** Wrap the main logic in a try-catch, and test with real movie titles. Hint: Run with deno run --allow-net main.ts "Movie Name".