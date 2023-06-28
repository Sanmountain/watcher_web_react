import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Headers.css";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [branExp, setBranExp] = useState("");

  useEffect(() => {
    const isloggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isloggedIn === "true" ? true : false);

    if (isloggedIn === "true") {
      const savedBranExp = localStorage.getItem("bran_exp");
      setBranExp(savedBranExp);
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("saveSaId");
    localStorage.removeItem("saveAcId");
    localStorage.removeItem("bran_exp");

    if (localStorage.getItem("rememberId") !== "true") {
      localStorage.removeItem("saveId");
    }

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
        {isLoggedIn && <div className="branExp">{branExp}</div>}
        <button
          type="button"
          className="logoutBtn"
          onClick={isLoggedIn ? onLogout : () => navigate("/")}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}
