import React from "react";
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
    navigate("/work");
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
          onClick={isLoggedIn ? onLogout : onLogin}
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
      </div>
    </div>
  );
}
