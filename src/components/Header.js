import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Headers.css";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [branExp, setBranExp] = useState("");

  useEffect(() => {
    const isloggedIn = localStorage.getItem("saveId");
    setIsLoggedIn(isloggedIn);

    const savedBranExp = localStorage.getItem("bran_exp");
    setBranExp(savedBranExp);
  });

  const onLogout = () => {
    localStorage.removeItem("saveId");
    localStorage.removeItem("saveSaId");
    localStorage.removeItem("saveAcId");
    localStorage.removeItem("bran_exp");
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
        <div className="branExp">{branExp}</div>
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
