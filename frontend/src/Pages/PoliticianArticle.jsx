import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import ArticleCard from "../Components/ArticleCard";
import Filters from "../Components/Filters";
import LoadingSpinner from "../Components/LoadingSpinner";

const PoliticianArticle = () => {
  const { name } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
    total: 0,
  });
  const [filters, setFilters] = useState({
    sentiment: "",
    scrapedInit: "",
    scrapedEnd: "",
  });

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({ politicianName: name });

      if (filters.sentiment) query.append("sentiment", filters.sentiment);
      if (filters.scrapedInit) query.append("scrapedInit", filters.scrapedInit);
      if (filters.scrapedEnd) query.append("scrapedEnd", filters.scrapedEnd);
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${apiBaseUrl}/article?${query.toString()}`);


      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

      const data = await res.json();
      setArticles(data);

      const statData = {
        positive: data.filter((a) => a.sentiment === "positive").length,
        neutral: data.filter((a) => a.sentiment === "neutral").length,
        negative: data.filter((a) => a.sentiment === "negative").length,
        total: data.length,
      };
      console.log("Sentiment Counts:", statData); 
      console.log("Total articles fetched:", data.length);
      setStats(statData);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [name, filters]);

  useEffect(() => {
    if (name) fetchArticles();
  }, [fetchArticles]);

  if (!name) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Invalid politician name.
      </div>
    );
  }



  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <header className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Articles about:{" "}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>
      </header>

      {!loading && !error && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Positive Articles"
            value={stats.positive}
            color="green"
          />
          <StatCard
            label="Neutral Articles"
            value={stats.neutral}
            color="yellow"
          />
          <StatCard
            label="Negative Articles"
            value={stats.negative}
            color="red"
          />
        </section>
      )}

      <Filters filters={filters} setFilters={setFilters} />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded-md">
          <div className="flex items-start gap-2">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-5a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-red-700">
              <p>{error}</p>
              <button
                className="mt-2 underline text-blue-600 hover:text-blue-800"
                onClick={fetchArticles}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="mt-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="large" />
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            No articles found with the current filters.
          </div>
        )}
      </section>
    </main>
  );
};

const StatCard = ({ label, value, color }) => {
  const colorMap = {
    green: {
      bg: "bg-green-50",
      border: "border-green-100",
      text: "text-green-600",
      label: "text-green-800",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-100",
      text: "text-yellow-600",
      label: "text-yellow-800",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-100",
      text: "text-red-600",
      label: "text-red-800",
    },
  };

  return (
    <div
      className={`${colorMap[color].bg} p-4 rounded-md border ${colorMap[color].border}`}
    >
      <div className={`${colorMap[color].text} text-2xl font-bold`}>
        {value}
      </div>
      <div className={`${colorMap[color].label} text-sm`}>{label}</div>
    </div>
  );
};

export default PoliticianArticle;
