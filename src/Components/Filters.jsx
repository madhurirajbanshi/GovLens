import { useMemo } from "react";
import { FunnelIcon, XCircleIcon } from "@heroicons/react/24/outline";

const Filters = ({ filters, setFilters }) => {
  const isFilterActive = useMemo(() => {
    return filters.sentiment || filters.scrapedInit || filters.scrapedEnd;
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      sentiment: "",
      scrapedInit: "",
      scrapedEnd: "",
    });
  };

  const handleDateChange = (field, value) => {
    if (
      field === "scrapedEnd" &&
      filters.scrapedInit &&
      value < filters.scrapedInit
    )
      return;
    if (
      field === "scrapedInit" &&
      filters.scrapedEnd &&
      value > filters.scrapedEnd
    )
      return;
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <FunnelIcon className="h-5 w-5 mr-2 text-blue-500" />
          Filter Articles
        </h3>
        {isFilterActive && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
          >
            <XCircleIcon className="h-4 w-4" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sentiment */}
        <div>
          <label
            htmlFor="sentiment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sentiment
          </label>
          <select
            id="sentiment"
            value={filters.sentiment}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sentiment: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label
            htmlFor="scrapedInit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            From Date
          </label>
          <input
            id="scrapedInit"
            type="date"
            value={filters.scrapedInit}
            max={filters.scrapedEnd || ""}
            onChange={(e) => handleDateChange("scrapedInit", e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* To Date */}
        <div>
          <label
            htmlFor="scrapedEnd"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            To Date
          </label>
          <input
            id="scrapedEnd"
            type="date"
            value={filters.scrapedEnd}
            min={filters.scrapedInit || ""}
            onChange={(e) => handleDateChange("scrapedEnd", e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
