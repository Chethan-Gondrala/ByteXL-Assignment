const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ==================== DYNAMIC QUOTE API ====================
app.get("/api/quote", async (req, res) => {
  try {
    console.log("[Quote API] Fetching dynamic quote from Quotable API...");

    const quoteResponse = await axios.get("https://api.quotable.io/random", {
      timeout: 8000,
    });

    // Extract quote data - Quotable uses 'content' field
    const quoteData = {
      quote: quoteResponse.data.content,
      author: quoteResponse.data.author || "Unknown",
      tags: quoteResponse.data.tags || [],
      length: quoteResponse.data.length || 0,
    };

    console.log("[Quote API] Success:", quoteData.quote);
    res.json(quoteData);
  } catch (error) {
    console.error("[Quote API] Error:", error.message);

    // Fallback to local quotes if API fails
    const fallbackQuotes = [
      {
        quote:
          "Success is not final; failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        quote: "Opportunities don't happen, you create them.",
        author: "Chris Grosser",
      },
      {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
      },
      {
        quote:
          "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
      },
      {
        quote: "Don't let yesterday take up too much of today.",
        author: "Will Rogers",
      },
      {
        quote: "You learn more from failure than from success.",
        author: "Unknown",
      },
      {
        quote:
          "It's not whether you get knocked down, it's whether you get up.",
        author: "Vince Lombardi",
      },
      {
        quote: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
      },
      {
        quote: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein",
      },
      {
        quote:
          "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb",
      },
      {
        quote:
          "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs",
      },
      {
        quote: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
      },
      {
        quote: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
      },
      {
        quote:
          "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
      },
    ];

    // Return a random fallback quote
    const randomFallback =
      fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    console.log("[Quote API] Using fallback quote:", randomFallback.quote);

    res.json(randomFallback);
  }
});

// ==================== WEATHER API ====================
app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "London";
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  if (!WEATHER_API_KEY) {
    return res.status(500).json({ error: "Weather API key not configured." });
  }

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`,
      { timeout: 8000 }
    );

    const { temp, feels_like, humidity } = weatherResponse.data.main;
    const { description, icon } = weatherResponse.data.weather[0];
    const windSpeed = weatherResponse.data.wind.speed;

    res.json({
      city: weatherResponse.data.name,
      country: weatherResponse.data.sys.country,
      temp,
      feelsLike: feels_like,
      condition: description,
      icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      humidity,
      windSpeed,
    });
  } catch (error) {
    console.error("[Weather API] Error:", error.message);
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

// ==================== CURRENCY API ====================
app.get("/api/currency", async (req, res) => {
  const amount = parseFloat(req.query.amount) || 1;

  if (amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0." });
  }

  try {
    const currencyResponse = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/INR",
      {
        timeout: 8000,
      }
    );

    const rates = currencyResponse.data.rates;
    const usd = (amount * rates.USD).toFixed(2);
    const eur = (amount * rates.EUR).toFixed(2);
    const gbp = (amount * rates.GBP).toFixed(2);

    res.json({
      amount,
      base: "INR",
      converted: {
        usd: parseFloat(usd),
        eur: parseFloat(eur),
        gbp: parseFloat(gbp),
      },
      rates: {
        USD: rates.USD,
        EUR: rates.EUR,
        GBP: rates.GBP,
      },
    });
  } catch (error) {
    console.error("[Currency API] Error:", error.message);
    res.status(500).json({ error: "Could not fetch currency data." });
  }
});

// ==================== HEALTH CHECK ====================
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running!", timestamp: new Date() });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`\n✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Quote API (Dynamic): http://localhost:${PORT}/api/quote`);
  console.log(`✓ Weather API: http://localhost:${PORT}/api/weather?city=Delhi`);
  console.log(
    `✓ Currency API: http://localhost:${PORT}/api/currency?amount=100`
  );
  console.log(`✓ Health Check: http://localhost:${PORT}/api/health\n`);
});
