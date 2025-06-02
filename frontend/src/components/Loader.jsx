import React from "react";

const Loader = () => {
  const loaderStyle = {
    display: "inline-block",
    width: "80px",
    height: "80px",
  };

  const spinnerStyle = {
    boxSizing: "border-box",
    display: "block",
    position: "absolute",
    width: "64px",
    height: "64px",
    margin: "8px",
    border: "8px solid #3498db",
    borderRadius: "50%",
    animation: "loader-spin 1.2s linear infinite",
    borderColor: "#3498db transparent transparent transparent",
  };

  const spinnerContainer = {
    position: "relative",
    width: "80px",
    height: "80px",
  };

  return (
    <>
      <style>
        {`
          @keyframes loader-spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div style={loaderStyle} aria-label="Loading">
        <div style={spinnerContainer}>
          <div style={spinnerStyle}></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
