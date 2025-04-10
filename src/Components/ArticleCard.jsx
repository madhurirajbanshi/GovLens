const ArticleCard = ({
  articleTitle,
  articleUrl,
  sentiment,
  portalName,
  scrapedAt,
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200 transition hover:shadow-lg">
      <h3 className="text-lg font-semibold text-blue-700 hover:underline mb-2">
        <a href={articleUrl} target="_blank" rel="noopener noreferrer">
          {articleTitle}
        </a>
      </h3>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Sentiment:</span>{" "}
        <span
          className={
            sentiment === "positive"
              ? "text-green-600"
              : sentiment === "negative"
              ? "text-red-600"
              : "text-yellow-600"
          }
        >
          {sentiment}
        </span>
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Portal:</span> {portalName}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-medium">Scraped At:</span>{" "}
        {new Date(scrapedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default ArticleCard;
