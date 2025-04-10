import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch articles
        const articlesRes = await fetch("/api/article?pageNumber=1");
        if (!articlesRes.ok) {
          throw new Error(`Articles API returned ${articlesRes.status}`);
        }
        const articlesData = await articlesRes.json();
        setArticles(articlesData);

        // Fetch politician names
        const politiciansRes = await fetch("/api/distinct/politician-names");
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
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2>ScrapGov - Political Articles</h2>

      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          Error: {error}
        </div>
      )}

      <div style={{ marginBottom: "30px" }}>
        <h4>Select a politician:</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {loading ? (
            <p>Loading politicians...</p>
          ) : politicians.length > 0 ? (
            politicians.map((name) => (
              <button
                key={name}
                onClick={() =>
                  navigate(`/politician/${encodeURIComponent(name)}`)
                }
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {name}
              </button>
            ))
          ) : (
            <p>No politicians found</p>
          )}
        </div>
      </div>

      <h3>Recent Articles</h3>
      <div className="articles-grid" style={{ display: "grid", gap: "20px" }}>
        {loading ? (
          <p>Loading articles...</p>
        ) : articles.length > 0 ? (
          articles.map((a) => <ArticleCard key={a.id} {...a} />)
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
