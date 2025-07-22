import React from "react";

const HomeSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full max-w-[600px] mb-6">
      <input
        type="text"
        placeholder="🔍 Search jobs... titles, vibes, and more"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-5 py-3 rounded-xl bg-[#1F2937]/70 backdrop-blur-md text-textLight border border-primary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-md hover:shadow-xl"
      />
    </div>
  );
};

export default HomeSearchBar;
