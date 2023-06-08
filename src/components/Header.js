import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Headers.css";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("saveId");
    setIsLoggedIn(isLoggedIn);
  }, [setIsLoggedIn]);

  const onLogout = () => {
    localStorage.removeItem("saveId");
    localStorage.removeItem("saveSaId");
    localStorage.removeItem("saveAcId");
    setIsLoggedIn(false);
    navigate("/");
  };

  const goPage1 = () => {
    if (isLoggedIn) {
      navigate("/work");
    }
  };

  const goPage2 = () => {
    if (isLoggedIn) {
      navigate("/vass");
    }
  };

  return (
    <div className="header">
      <div className="logoBig">WATCHER</div>
      <div className="logoSmall">JHC</div>
      <div className="titleHeader" onClick={goPage1}>
        WORK
      </div>
      <div className="titleHeader" onClick={goPage2}>
        VASS
      </div>
      <div>
        <button
          type="button"
          className="logoutBtn"
          onClick={isLoggedIn ? onLogout : () => navigate("/")}
        >
          {localStorage.getItem("saveId") === null ? "로그인" : "로그아웃"}
        </button>
      </div>
    </div>
  );
}
