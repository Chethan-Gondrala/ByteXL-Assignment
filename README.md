# 🌐 InfoHub - Full Stack Web Application

A modern, responsive single-page application (SPA) that brings together three powerful utilities into one seamless interface. Built with **React**, **Node.js**, and **Express**, InfoHub demonstrates full-stack development expertise with real API integration.

## 🎯 Features

### 🌤️ Weather Information
- Real-time weather data from **OpenWeatherMap API**
- Search weather for any city
- Displays: Temperature, "Feels Like", Humidity, Wind Speed
- Beautiful weather icons from API

### 💱 Currency Converter
- Convert **INR to USD, EUR, and GBP** instantly
- Real-time exchange rates from **ExchangeRate-API**
- Quick amount selection buttons (₹100, ₹500, ₹1000, ₹5000, ₹10000)
- Live exchange rate information

### ✨ Motivational Quote Generator
- Fresh motivational quotes from **Quotable API**
- Different quote every time you click
- Copy quotes to clipboard
- Share quotes on Twitter
- Track quotes viewed in session

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP requests to external APIs
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### External APIs
- **OpenWeatherMap** - Weather data
- **ExchangeRate-API** - Currency conversion rates
- **Quotable.io** - Motivational quotes

## 📁 Project Structure
InfoHub-Challenge/
│
├── README.md                          ← Project documentation
├── .gitignore                         ← Git ignore file
│
├── server/                            ← Backend (Node.js + Express)
│   ├── node_modules/                  ← Dependencies (auto-generated)
│   ├── .env                           ← Environment variables (NOT committed)
│   ├── .gitignore                     ← Server git ignore
│   ├── package.json                   ← Server dependencies
│   ├── package-lock.json              ← Lock file
│   └── server.js                      ← Main Express server
│
└── client/                            ← Frontend (React + Vite)
    ├── node_modules/                  ← Dependencies (auto-generated)
    ├── public/                        ← Static assets
    │   └── vite.svg
    ├── src/
    │   ├── components/                ← Reusable React components
    │   │   ├── Navbar.jsx             ← Header navigation
    │   │   ├── Navbar.css
    │   │   ├── WeatherModule.jsx      ← Weather display component
    │   │   ├── WeatherModule.css
    │   │   ├── CurrencyConverter.jsx  ← Currency conversion component
    │   │   ├── CurrencyConverter.css
    │   │   ├── QuoteGenerator.jsx     ← Quote display component
    │   │   └── QuoteGenerator.css
    │   ├── utils/                     ← Utility functions
    │   │   └── api.js                 ← API configuration & calls
    │   ├── App.jsx                    ← Main app component (tab switching)
    │   ├── App.css                    ← Global app styles
    │   ├── main.jsx                   ← React entry point
    │   └── index.css                  ← Global styles
    ├── .env                           ← Frontend env variables (optional)
    ├── .gitignore                     ← Client git ignore
    ├── .eslintrc.cjs                  ← ESLint config (optional)
    ├── index.html                     ← HTML template
    ├── package.json                   ← Client dependencies
    ├── package-lock.json              ← Lock file
    ├── vite.config.js                 ← Vite configuration
    └── README.md                      ← Client documentation



