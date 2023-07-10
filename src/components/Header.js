import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Headers.css";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [branExp, setBranExp] = useState("");

  useEffect(() => {
    const useUserId = localStorage.getItem("saveId");
    const localBranExp = localStorage.getItem("bran_exp");

    setIsLoggedIn(useUserId ? true : false);
    setBranExp(localBranExp ? localBranExp : "");
  });

  const onLogout = () => {
    localStorage.removeItem("saveSaId");
    localStorage.removeItem("saveAcId");
    localStorage.removeItem("bran_exp");
    localStorage.removeItem("saveId");

    setIsLoggedIn(false);
    setBranExp("");
    navigate("/");
  };

  const goPage1 = () => {
    if (isLoggedIn === true) {
      navigate("/work");
    }
  };

  const goPage2 = () => {
    if (isLoggedIn === true) {
      navigate("/vass");
    }
  };

  return (
    <div className="header">
      <div className="logoBig">WATCHER</div>
      {isLoggedIn && (
        <div className="titleHeader" onClick={goPage1}>
          송장조회
        </div>
      )}
      {isLoggedIn && (
        <div className="titleHeader" onClick={goPage2}>
          영상조회
        </div>
      )}
      <div>
        {isLoggedIn && <div className="branExp">{branExp}</div>}
        <button
          type="button"
          className="logoutBtn"
          onClick={isLoggedIn ? onLogout : null}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}
