// components/home/StickyJobDetails.jsx
import React from "react";
import SelectedJob from "./SelectedJob";

const StickyJobDetails = ({ selectedPost }) => {
  return (
    <div className="w-full md:w-[500px]">
      {selectedPost && <SelectedJob selectedPost={selectedPost} />}
    </div>
  );
};

export default StickyJobDetails;
