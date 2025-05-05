require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.post('/api/recommendations', async (req, res) => {
  try {
    const { userInput } = req.body;


    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a movie expert. Based on the user's mood, situation, or preferences, suggest exactly 3 specific movie titles that would match their needs. The user might describe their mood, situation, or what they're looking for in natural language. Return only the movie titles in a comma-separated list, nothing else. Make sure to return exactly 3 movies."
        },
        {
          role: "user",
          content: userInput
        }
      ],
    });

    const suggestedMovies = completion.choices[0].message.content.split(',').map(title => title.trim()).slice(0, 3);
    
    // Fetch movie details from TMDB
    const moviePromises = suggestedMovies.map(async (title) => {
      const searchResponse = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query: title,
        },
      });

      if (searchResponse.data.results.length > 0) {
        const movie = searchResponse.data.results[0];
        return {
          title: movie.title,
          year: movie.release_date.split('-')[0],
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          trailer: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`,
        };
      }
      return null;
    });

    const movies = (await Promise.all(moviePromises)).filter(movie => movie !== null);
    
    if (movies.length < 3) {
      const remainingCount = 3 - movies.length;
      const additionalPromises = suggestedMovies.slice(movies.length).map(async (title) => {
        const searchResponse = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
          params: {
            api_key: TMDB_API_KEY,
            query: title,
            page: 2, 
          },
        });

        if (searchResponse.data.results.length > 0) {
          const movie = searchResponse.data.results[0];
          return {
            title: movie.title,
            year: movie.release_date.split('-')[0],
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            trailer: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`,
          };
        }
        return null;
      });

      const additionalMovies = (await Promise.all(additionalPromises)).filter(movie => movie !== null);
      movies.push(...additionalMovies);
    }


    res.json(movies.slice(0, 3));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get movie recommendations' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 