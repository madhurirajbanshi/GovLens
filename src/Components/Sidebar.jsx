import React from "react";
import { FaTachometerAlt, FaFileAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-800 text-white flex flex-col shadow-lg transition-all duration-300 fixed left-0 top-0`}
    >
      <div className="p-6 text-2xl font-bold flex justify-between items-center">
        {!isCollapsed && <span>ScrapGov</span>}
        <button
          onClick={toggleSidebar}
          className={`text-white ${isCollapsed ? "mx-auto" : ""}`}
        >
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>
      <ul className="flex-1 p-4 space-y-4">
        <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FaTachometerAlt className="text-lg" />
          {!isCollapsed && <Link to="/">Dashboard</Link>}
        </li>
        <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FaFileAlt className="text-lg" />
          {!isCollapsed && <Link to="/articles">Articles</Link>}
        </li>
        <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FaFileAlt className="text-lg" />
          {!isCollapsed && <Link to="/sentimentchart">Sentiment Chart</Link>}
        </li>
      </ul>
      {!isCollapsed && (
        <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
          &copy; 2025 ScrapGov
        </div>
      )}
    </div>
  );
};

export default Sidebar;
