import React, { useState, useEffect } from "react";
import { FaSearch, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ isCollapsed }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [politicianNames, setPoliticianNames] = useState([]);
  const [selectedPolitician, setSelectedPolitician] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the list of distinct politician names
  useEffect(() => {
    const fetchPoliticianNames = async () => {
      try {
        const response = await fetch(
          "https://scrapgov-weapi-service-288217385136.asia-southeast1.run.app/api/distinct/politician-names"
        );
        const data = await response.json();
        setPoliticianNames(data);
      } catch (error) {
        console.error("Error fetching politician names:", error);
      }
    };

    fetchPoliticianNames();
  }, []);

  const fetchArticles = async (filters) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await fetch(
        `https://scrapgov-weapi-service-288217385136.asia-southeast1.run.app/api/article?${queryString}`
      );
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filters = {
      articleTitle: searchQuery,
      politicianName: searchQuery,
      pageNumber: 1,
    };
    fetchArticles(filters);
  };

  // Handle politician change (dropdown)
  const handlePoliticianChange = (e) => {
    const politicianName = e.target.value;
    setSelectedPolitician(politicianName);
    const filters = {
      politicianName: politicianName,
      pageNumber: 1,
    };
    fetchArticles(filters);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <div
      className={`h-16 bg-[#121625] shadow-md flex items-center justify-between px-4 fixed top-0 right-0 z-40 transition-all duration-300 ${
        isCollapsed ? "left-16" : "left-64"
      }`}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>

        <select
          value={selectedPolitician}
          onChange={handlePoliticianChange}
          className="bg-transparent outline-none px-2 py-1 text-sm text-gray-200 placeholder-gray-400"
        >
          <option value="">Select Politician</option>
          {politicianNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center border border-gray-600 p-1 rounded bg-gray-700 bg-opacity-30"
        >
          <input
            type="text"
            placeholder="Search by Title or Politician"
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent outline-none px-2 py-1 text-sm text-gray-200 placeholder-gray-400"
          />
          <button type="submit" className="text-gray-300">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="text-gray-300 p-2 rounded hover:bg-gray-700"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center">
          <FaSignOutAlt className="mr-2" />
          {true ? "Logout" : "Login"}
        </button>
      </div>

      {loading && <p className="text-gray-200">Loading articles...</p>}

      <div className="overflow-y-auto max-h-96 mt-4">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 mb-2 rounded-lg shadow-lg"
            >
              <h3 className="text-white font-semibold">
                {article.articleTitle}
              </h3>
              <p className="text-gray-400">{article.articleBody}</p>
              <a
                href={article.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-200">No articles found for "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
