import React from "react";
import JobFilters from "./JobFilters";
import HomeSearchBar from "./HomeSearchBar";
import {
  categories,
  experienceLevels,
  jobTypes,
  pakistaniCities,
} from "../../utils/SearchAndFilterData/SearchAndFilterData";

const Filters = ({
  searchTerm,
  setSearchTerm,
  sortOptions,
  setsortOptions,
  sortCategory,
  setSortCategory,
  sortCity,
  setsortCity,
  jobType,
  setjobType,
  experienceLevel,
  setexperienceLevel,
}) => {
  const clearFilters = () => {
    setsortOptions("newest");
    setSortCategory("all");
    setsortCity("all");
  };
  return (
    <>
      <div className="w-full max-w-[600px] mb-6">
        <input
          type="text"
          placeholder="🔍 Search jobs... titles, vibes, and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 rounded-xl bg-[#1F2937]/70 backdrop-blur-md text-textLight border border-primary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-md hover:shadow-xl"
        />
      </div>

      <div className="bg-[#1f2937] p-3 rounded-2xl shadow-lg border border-primary mt-2">
        <div className="flex flex-wrap gap-4">
          {/* Sort By */}
          <div className="flex flex-col">
            <label className="text-sm text-textMuted mb-1">Sort By</label>
            <select
              value={sortOptions}
              onChange={(e) => setsortOptions(e.target.value)}
              className="bg-cardBg text-textLight border border-textMuted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm text-textMuted mb-1">Category</label>
            <select
              value={sortCategory}
              onChange={(e) => setSortCategory(e.target.value)}
              className="bg-cardBg text-textLight border border-textMuted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((category) => (
                <option
                  key={category.categoryValue}
                  value={category.categoryValue}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-sm text-textMuted mb-1">City</label>
            <select
              value={sortCity}
              onChange={(e) => setsortCity(e.target.value)}
              className="bg-cardBg text-textLight border border-textMuted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Cities</option>
              {pakistaniCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div className="flex flex-col">
            <label className="text-sm text-textMuted mb-1">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setjobType(e.target.value)}
              className="bg-cardBg text-textLight border border-textMuted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {jobTypes.map((type) => (
                <option key={type.typeValue} value={type.typeValue}>
                  {type.typeName}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level */}

          <div className="flex flex-col">
            <label className="text-sm text-textMuted mb-1">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setexperienceLevel(e.target.value)}
              className="bg-cardBg text-textLight border border-textMuted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {experienceLevels.map((type) => (
                <option key={type.levelValue} value={type.levelValue}>
                  {type.levelName}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="bg-primary text-white px-6 py-2 rounded-md shadow-md font-semibold mt-[22px]"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
