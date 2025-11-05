import { useState, useEffect } from "react";
import { quoteAPI } from "../utils/api";
import "./QuoteGenerator.css";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quoteCount, setQuoteCount] = useState(0);
  const [tags, setTags] = useState([]);

  // Function to fetch a NEW random quote
  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    setQuote("");
    setAuthor("");
    setTags([]);

    try {
      console.log("🔄 Fetching new dynamic quote...");
      const response = await quoteAPI.getQuote();

      console.log("✓ Quote received:", response.data);

      if (response.data.quote) {
        setQuote(response.data.quote);
        setAuthor(response.data.author || "Unknown");
        setTags(response.data.tags || []);
        setQuoteCount((prev) => prev + 1);
        console.log("✓ Quote loaded successfully");
      } else {
        setError("Quote data is empty");
      }

      setLoading(false);
    } catch (err) {
      console.error("❌ Quote fetch error:", err);

      const errorMsg =
        err.response?.data?.error || err.message || "Could not fetch quote";

      setError(errorMsg);
      setLoading(false);
    }
  };

  // Fetch quote on component mount
  useEffect(() => {
    fetchQuote();
  }, []);

  // Copy quote to clipboard
  const copyToClipboard = () => {
    const text = `"${quote}" — ${author}`;
    navigator.clipboard.writeText(text);
    alert("✓ Quote copied to clipboard!");
  };

  // Share on Twitter
  const shareOnTwitter = () => {
    const tweetText = `"${quote}" — ${author}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="quote-module">
      <h2>✨ Motivational Quote Generator</h2>

      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Getting inspired...</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <span>❌</span>
          <p>{error}</p>
          <button onClick={fetchQuote} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && quote && (
        <div className="quote-card">
          <div className="quote-mark">"</div>
          <p className="quote-text">{quote}</p>
          <p className="quote-author">— {author}</p>

          {tags && tags.length > 0 && (
            <div className="quote-tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {!isLoading && !error && !quote && (
        <div className="quote-card">
          <p style={{ textAlign: "center", color: "#999" }}>
            Click "Get New Quote" to start
          </p>
        </div>
      )}

      <div className="quote-actions">
        <button
          onClick={fetchQuote}
          disabled={isLoading}
          className="action-btn secondary-btn"
          title="Get a new random quote"
        >
          {isLoading ? "⏳ Loading..." : "✨ Get New Quote"}
        </button>

        {quote && (
          <>
            <button
              onClick={copyToClipboard}
              disabled={isLoading}
              className="action-btn secondary-btn"
              title="Copy quote to clipboard"
            >
              📋 Copy
            </button>

            <button
              onClick={shareOnTwitter}
              disabled={isLoading}
              className="action-btn secondary-btn"
              title="Share on Twitter"
            >
              𝕏 Share
            </button>
          </>
        )}
      </div>

      {quoteCount > 0 && (
        <div className="quote-stats">
          <p>
            Quotes viewed: <strong>{quoteCount}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
