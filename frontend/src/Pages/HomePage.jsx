import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Sparkles } from "lucide-react"; 

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      try {
        const articlesRes = await fetch(`${baseUrl}/article?pageNumber=1`);
        if (!articlesRes.ok) {
          throw new Error(`Articles API returned ${articlesRes.status}`);
        }
        const articlesData = await articlesRes.json();
        setArticles(articlesData);

        const politiciansRes = await fetch(
          `${baseUrl}/distinct/politician-names`
        );
        if (!politiciansRes.ok) {
          throw new Error(`Politicians API returned ${politiciansRes.status}`);
        }
        const politiciansData = await politiciansRes.json();
        setPoliticians(politiciansData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-50 text-gray-900 rounded-xl p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Political Articles Monitor
            </h1>
            <p className="mt-2 text-gray-700 text-sm md:text-base">
              Stay updated with the latest news and sentiment analysis about
              Nepalese politicians across major news portals.
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src="https://4.bp.blogspot.com/-xQiVfurjEqg/WzOeOJ4aTdI/AAAAAAAAol0/72y9ICam56shTYXRwaUL7vhqqbTDAM80ACLcBGAs/s1600/Flag_of_Nepal.gif"
              alt="Politics"
              className="w-24 md:w-28"
            />
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-5a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error: {error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Politicians Filter */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Select a Politician
        </h2>
        <div className="flex flex-wrap gap-3">
          {loading ? (
            <LoadingSpinner />
          ) : politicians.length > 0 ? (
            politicians.map((name) => (
              <button
                key={name}
                onClick={() =>
                  navigate(`/politician/${encodeURIComponent(name)}`)
                }
                className="bg-white border border-blue-600 text-blue-700 font-medium py-3 px-6 rounded-full transition-all shadow shadow-blue-100 hover:shadow-md"
              >
                {name}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No politicians found</p>
          )}
        </div>
      </div>

      {/* Articles Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Articles</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" />
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No articles found</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
