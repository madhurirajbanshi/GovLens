import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleCard from "../Components/ArticleCard";
import Filters from "../Components/Filters";

const PoliticianArticle = () => {
  const { name } = useParams();
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    sentiment: "",
    scrapedInit: "",
    scrapedEnd: "",
  });

  useEffect(() => {
    const query = new URLSearchParams({
      politicianName: name,
    });

    // Only add non-empty filter values
    if (filters.sentiment) query.append("sentiment", filters.sentiment);
    if (filters.scrapedInit) query.append("scrapedInit", filters.scrapedInit);
    if (filters.scrapedEnd) query.append("scrapedEnd", filters.scrapedEnd);

    fetch(`/api/article?${query.toString()}`)
      .then((res) => res.json())
      .then(setArticles)
      .catch((error) => console.error("Error fetching articles:", error));
  }, [name, filters]);

  return (
    <div>
      <h2>Articles for: {name}</h2>
      <Filters filters={filters} setFilters={setFilters} />
      <div className="articles-grid">
        {articles.length > 0 ? (
          articles.map((a) => <ArticleCard key={a.id} {...a} />)
        ) : (
          <p>Loading articles...</p>
        )}
      </div>
    </div>
  );
};

export default PoliticianArticle;
