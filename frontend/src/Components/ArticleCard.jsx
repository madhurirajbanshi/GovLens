const ArticleCard = ({
  articleTitle,
  articleUrl,
  sentiment,
  portalName,
  scrapedAt,
}) => {
  const getBgColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-50 border-green-100";
      case "negative":
        return "bg-red-50 border-red-100";
      case "neutral":
        return "bg-yellow-50 border-yellow-100";
      default:
        return "bg-gray-50 border-gray-100";
    }
  };

  const getTextColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      case "neutral":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getBadgeColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      case "neutral":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`${getBgColor(
        sentiment
      )} border rounded-md overflow-hidden transition-shadow duration-300 hover:shadow-md`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(
              sentiment
            )}`}
          >
            {sentiment}
          </span>
          <span className="text-xs text-gray-500">{formatDate(scrapedAt)}</span>
        </div>

        <h3 className="font-medium text-lg mb-3">
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-600"
          >
            {articleTitle}
          </a>
        </h3>

        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-500 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <span className="text-gray-600">{portalName}</span>
          </div>
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            Visit
            <svg
              className="w-4 h-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
