import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot in React 18
import App from "./App";
import "./styles/Counter.css"; // Ensure correct CSS import path

// Get root element
const rootElement = document.getElementById("root");

// Create a root and render the App
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
