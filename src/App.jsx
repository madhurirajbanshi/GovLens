import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Articles from "./Components/Article";
import Sidebar from "./Components/Sidebar";
import SentimentChart from "./Components/SentimentChart";

function App() {
  // Add state for sidebar collapse here at the parent level
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <div className="flex">
        {/* Pass toggleSidebar function and state to Sidebar */}
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

        {/* Main content wrapper */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          {/* Pass isCollapsed to Navbar */}
          <Navbar isCollapsed={isCollapsed} />

          {/* Content area with top padding to account for navbar */}
          <div className="p-6 bg-gray-100 min-h-screen pt-24">
            <Routes>
              <Route
                path="/"
                element={<h1>Welcome to ScrapGov Dashboard</h1>}
              />
              <Route path="/articles" element={<Articles />} />
              <Route path="/sentimentchart" element={<SentimentChart />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
