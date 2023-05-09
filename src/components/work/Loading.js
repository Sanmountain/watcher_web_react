import React from "react";
import Spinner from "../../styles/Spin-1s-200px.gif";

export const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "block",
          fontSize: "40px",
        }}
      >
        Loading
      </div>
      <img src={Spinner} alt="로딩중" width="70%" />
    </div>
  );
};
export default Loading;
