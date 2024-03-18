import React from "react";
import { useState, CSSProperties } from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div>
      <div className="sweet-loading text-center">
        <HashLoader color="#0000" loading={loading} size={80} />
      </div>
    </div>
  );
};

export default Loader;
