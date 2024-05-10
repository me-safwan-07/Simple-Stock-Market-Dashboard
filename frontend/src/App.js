import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";
import "./App.css";
import { FiPlusCircle } from "react-icons/fi";

const Stocks = ({ addToWatchlist }) => {
    const [stocks, setStocks] = useState([]);
 
    useEffect(() => {
        // Fetch stock data from the backend
        fetch("http://localhost:5000/api/stocks")
            .then((res) => res.json())
            .then((data) => setStocks(data))
            .catch((error) => console.error("Error fetching stocks:", error));
    }, []);
    console.log(setStocks, "Stocksdata");
 
    const getRandomColor = () => {
        const colors = ["#FF0000", "#00FF00"]; // Red and Green
        return colors[Math.floor(Math.random() * colors.length)];
    };
 
    return (
        <div className="App">
            <h1>Stock Market Dashboard</h1>
            <h2>Top by Market Cap</h2>
            <div className="table">
            
            <ul>
            <div className="company-Stock-Watchlist">
                <span className="Company">Company</span>
                <span className="Price">Price</span>
                <span className="Watchlist">Watchlist</span>
            </div>
                {stocks.map((stock) => (
                    <li key={stock.symbol}>
                        {stock.company} ({stock.symbol}) -
                        <span style={{ color: getRandomColor() }}>
                            {" "}
                            ${stock.initial_price}
                        </span>
                        <button onClick={() => addToWatchlist(stock)}>
                            <FiPlusCircle className="watchlist"/>
                        </button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};
 
const Watchlist = ({ watchlist }) => {
    const getRandomColor = () => {
        const colors = ["#FF0000", "#00FF00"]; // Red and Green
        return colors[Math.floor(Math.random() * colors.length)];
    };
 
    return (
        <div className="App">
            <h1>Stock Market Dashboard</h1>
            <h2>My Watchlist</h2>
            <ul>
                <div className="company-Stock-Watchlist">
                    <span className="company">Company</span>
                    <span className="price">Price</span>
                </div>
                {watchlist.map((stock) => (
                    <li key={stock.symbol}>
                        {stock.company} ({stock.symbol}) -
                        <span style={{ color: getRandomColor() }}>
                            {" "}
                            ${stock.initial_price}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
 

function App() {
    const [watchlist, setWatchlist] = useState([]);
 
    const addToWatchlist = (stock) => {
        // Add stock to watchlist
        fetch("http://localhost:5000/api/watchlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stock),
        })
            .then((res) => res.json())
            .then((data) => {
                // Show an alert with the message received from the server
                alert(data.message);
                setWatchlist([...watchlist, stock]);
            })
            .catch((error) =>
                console.error("Error adding to watchlist:", error)
            );
    };
 
    return (
        <Router>
            <nav>
                <NavLink to="/stocks">Stocks</NavLink>
                <NavLink to="/watchlist">Watchlist</NavLink>
            </nav>
            <Routes>
                <Route
                    path="/stocks"
                    element={<Stocks addToWatchlist={addToWatchlist} />}
                />
                <Route
                    path="/watchlist"
                    element={<Watchlist watchlist={watchlist} />}
                />
            </Routes>
        </Router>
    );
}
 
export default App;