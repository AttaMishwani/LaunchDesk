import React from "react";
import { pakistaniCities } from "../../ui/SearchAndFilterData/SearchAndFilterData";

const JobFilters = ({
  sortOptions,
  setsortOptions,
  sortCategory,
  setSortCategory,
  categories,
  setsortCity,
  sortCity,
}) => {
  const clearFilters = () => {
    setsortOptions("newest");
    setSortCategory("all");
    setsortCity("all");
  };

  return (
    <div className="filters flex items-center">
      {" "}
      {/* sort by */}
      <div className="mt-4">
        <select
          name=""
          className="bg-cardBg text-textLight border border-textMuted rounded px-4 py-2"
          value={sortOptions}
          onChange={(e) => setsortOptions(e.target.value)}
          id=""
        >
          <option value="newest">Sort by: Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {/* category */}
      <div className="mt-4">
        <label htmlFor="category-select" className="text-textLight">
          Category:
        </label>
        <select
          name="category"
          value={sortCategory}
          onChange={(e) => setSortCategory(e.target.value)}
          className="bg-cardBg text-textLight border border-textMuted rounded px-4 py-2"
          id="category-select"
        >
          {categories.map((category) => (
            <option key={category.categoryValue} value={category.categoryValue}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      {/* city */}
      <div className="mt-4">
        <label htmlFor="city-select" className="text-textLight">
          City:
        </label>
        <select
          name="city"
          onChange={(e) => setsortCity(e.target.value)}
          value={sortCity}
          className="bg-cardBg text-textLight border border-textMuted rounded px-4 py-2"
          id="city-select"
        >
          {pakistaniCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={clearFilters}
        className="bg-red-500 text-white rounded px-4 py-2"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default JobFilters;
