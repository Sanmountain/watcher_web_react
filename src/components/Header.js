import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Headers.css";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const onLogout = () => {
    sessionStorage.removeItem("saveId");
    setIsLoggedIn(false);
    navigate("/");
  };
  const onLogin = () => {
    navigate("/");
  };
  const goPage = () => {
    if (isLoggedIn) {
      navigate("/main");
    }
  };

  return (
    <div className="header">
      <div className="logoBig" onClick={goPage}>
        WATCHER
      </div>
      <div className="logoSmall">JHC</div>
      <div>
        <button
          type="button"
          className="logoutBtn"
          onClick={isLoggedIn ? onLogout : onLogin}
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
      </div>
    </div>
  );
}
