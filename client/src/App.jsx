import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";

function App() {
  const [activeTab, setActiveTab] = useState("Weather");

  const tabs = [
    {
      name: "Weather",
      icon: "🌤️",
      component: WeatherModule,
    },
    {
      name: "Currency",
      icon: "💱",
      component: CurrencyConverter,
    },
    {
      name: "Quote",
      icon: "✨",
      component: QuoteGenerator,
    },
  ];

  const ActiveComponent = tabs.find((tab) => tab.name === activeTab)?.component;

  return (
    <div className="app-wrapper">
      <Navbar />

      <div className="app-container">
        <div className="app-header">
          <h1>🌐 InfoHub</h1>
          <p>Your daily utility companion</p>
        </div>

        <div className="tab-navigation">
          <div className="all-buttons">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`tab-btn ${activeTab === tab.name ? "active" : ""}`}
                onClick={() => setActiveTab(tab.name)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-text">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="tab-content">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
}

export default App;
