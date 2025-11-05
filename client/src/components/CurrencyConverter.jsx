import { useState } from "react";
import { currencyAPI } from "../utils/api";
import "./CurrencyConverter.css";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async (e) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (!amount || numAmount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await currencyAPI.convert(numAmount);
      setResult(response.data);
      setLoading(false);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "Currency conversion failed";
      setError(errorMsg);
      setLoading(false);
    }
  };

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
  };

  return (
    <div className="currency-module">
      <h2>💱 Currency Converter</h2>

      <form onSubmit={handleConvert} className="currency-form">
        <div className="amount-input">
          <label htmlFor="amount">Amount (INR)</label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount in INR"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
            min="0"
            step="0.01"
          />
        </div>

        <button className="convertbtn" type="submit" disabled={isLoading}>
          {isLoading ? "Converting..." : "Convert"}
        </button>
      </form>

      <div className="quick-amounts">
        <p>Quick select:</p>
        <div className="amount-buttons">
          {[100, 500, 1000, 5000, 10000].map((value) => (
            <button
              key={value}
              type="button"
              className={`quick-btn ${
                amount === value.toString() ? "active" : ""
              }`}
              onClick={() => handleQuickAmount(value)}
              disabled={isLoading}
            >
              ₹{value}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Converting currency...</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <span>Something Went Wrong...</span>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && result && (
        <div className="currency-result">
          <div className="result-header">
            <h3>Conversion Result</h3>
            <p className="result-amount">₹{result.amount}</p>
          </div>

          <div className="conversion-rates">
            <div className="rate-card">
              <div className="currency-name">
                <span className="flag">💵</span>
                <span>US Dollar</span>
              </div>
              <div className="rate-value">${result.converted.usd}</div>
              <div className="exchange-rate">
                1 INR = ${result.rates.USD.toFixed(4)}
              </div>
            </div>

            <div className="rate-card">
              <div className="currency-name">
                <span className="flag">€</span>
                <span>Euro</span>
              </div>
              <div className="rate-value">€{result.converted.eur}</div>
              <div className="exchange-rate">
                1 INR = €{result.rates.EUR.toFixed(4)}
              </div>
            </div>

            <div className="rate-card">
              <div className="currency-name">
                <span className="flag">£</span>
                <span>British Pound</span>
              </div>
              <div className="rate-value">£{result.converted.gbp}</div>
              <div className="exchange-rate">
                1 INR = £{result.rates.GBP.toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
