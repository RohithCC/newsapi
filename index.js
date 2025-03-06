const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const API_KEY = '37811e138a2448cdb635bfde2f9dc1ef'; // Your API key here

// Middleware for CORS
app.use(cors());


app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Proxy route for articles search
app.get('/api/articles', async (req, res) => {
  const { query, category, sortBy, fromDate, toDate } = req.query;

  const apiUrl = query
    ? `https://newsapi.org/v2/everything?q=${query}&sortBy=${sortBy}&from=${fromDate}&to=${toDate}&apiKey=${API_KEY}`
    : `https://newsapi.org/v2/top-headlines?category=${category}&sortBy=${sortBy}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data); // Send the response back to the client
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
