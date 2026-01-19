import { Search, Filter as FilterIcon, X } from "lucide-react";
import type { BlogsResponse } from "../../hooks/types";
import { useEffect, useState } from "react";

interface FilterData {
  data: BlogsResponse[];
  onFilterChange: (filteredData: BlogsResponse[]) => void;
}

export const Filter = ({ data, onFilterChange }: FilterData) => {
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);


  useEffect(() => {
    if (!data || data.length === 0) return;

    const filtered = data.filter((blog) => {
      const matchesTitle = titleFilter
        ? blog.title.toLowerCase().includes(titleFilter.toLowerCase())
        : true;
      
      const matchesAuthor = authorFilter
        ? blog.author.toLowerCase().includes(authorFilter.toLowerCase())
        : true;

      return matchesTitle && matchesAuthor;
    });

    onFilterChange(filtered);
  }, [titleFilter, authorFilter, data]); 

  const clearFilters = () => {
    setTitleFilter("");
    setAuthorFilter("");
  };

  const hasActiveFilters = titleFilter || authorFilter;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FilterIcon className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Filter Posts</h3>
              <p className="text-sm text-gray-500">Search by title or author</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
          >
            {isExpanded ? "−" : "+"}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                  placeholder="Search blog titles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                {titleFilter && (
                  <button
                    onClick={() => setTitleFilter("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X size={18} className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Author
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  placeholder="Search authors..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                {authorFilter && (
                  <button
                    onClick={() => setAuthorFilter("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X size={18} className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-700">
                      Active Filters:
                    </span>
                    {titleFilter && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        Title: {titleFilter}
                        <button
                          onClick={() => setTitleFilter("")}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    {authorFilter && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        Author: {authorFilter}
                        <button
                          onClick={() => setAuthorFilter("")}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};