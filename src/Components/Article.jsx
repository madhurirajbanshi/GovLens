import React, { useEffect, useState } from "react";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://scrapgov-weapi-service-288217385136.asia-southeast1.run.app/api/article"
      )
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Articles</h2>
      <p className="text-gray-600 mb-2">Total Articles: {articles.length}</p>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{article.articleTitle}</h3>
            <p>
              <strong>Author:</strong> {article.author}
            </p>
            <p>
              <strong>Portal:</strong> {article.portalName}
            </p>
            <p>
              <strong>Sentiment:</strong> {article.sentiment}
            </p>
            <a
              href={article.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
