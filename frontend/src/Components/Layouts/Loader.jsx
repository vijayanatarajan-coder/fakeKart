import React from "react";

const Loader = () => {
  return (
    <section
      className="loader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className="visually-hidden">Loading...</span>
    </section>
  );
};

export default Loader;
