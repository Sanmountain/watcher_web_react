import React from "react";
import Spinner from "../../styles/Spin-1s-200px.gif";

export const Loading = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(80,80,80,0.3)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "block",
            fontSize: "40px",
            color: "white",
          }}
        >
          Loading
        </div>
        <img src={Spinner} alt="로딩중" width="70%" />
      </div>
    </div>
  );
};
export default Loading;
