const Filters = ({ filters, setFilters }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-md mb-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="sentiment"
            className="block text-sm font-medium text-gray-700"
          >
            Sentiment
          </label>
          <select
            id="sentiment"
            value={filters.sentiment}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sentiment: e.target.value }))
            }
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="scrapedInit"
            className="block text-sm font-medium text-gray-700"
          >
            Scraped Start Date
          </label>
          <input
            id="scrapedInit"
            type="datetime-local"
            value={filters.scrapedInit}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, scrapedInit: e.target.value }))
            }
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="scrapedEnd"
            className="block text-sm font-medium text-gray-700"
          >
            Scraped End Date
          </label>
          <input
            id="scrapedEnd"
            type="datetime-local"
            value={filters.scrapedEnd}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, scrapedEnd: e.target.value }))
            }
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
