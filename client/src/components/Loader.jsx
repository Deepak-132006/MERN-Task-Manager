import React from "react";
import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0">
      <PacmanLoader
        color="#2C666E"
        cssOverride={{}}
        loading
        margin={2}
        size={25}
        speedMultiplier={1}
      />
    </div>
  );
};

export default Loader;
