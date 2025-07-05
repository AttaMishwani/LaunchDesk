import React from "react";
import "./css/loader.css";

const Loader = ({ height }) => {
  return (
    <div
      className={`${height && "min-h-[80vh]"} flex items-center justify-center`}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
