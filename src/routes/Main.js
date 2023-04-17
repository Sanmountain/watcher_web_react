import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("saveId");
    navigate("/");
  };

  return (
    <>
      <div>
        <h2>Main</h2>

        <form>
          <NavLink to="/work">
            <button
              style={{
                cursor: "pointer",
                margin: "5px",
                width: "50px",
                height: "30px",
                border: "1px solid black",
              }}
            >
              Work
            </button>
          </NavLink>
          <button
            type="button"
            style={{
              cursor: "pointer",
              margin: "5px",
              width: "100px",
              height: "30px",
              border: "1px solid black",
            }}
            onClick={onLogout}
          >
            로그아웃
          </button>
        </form>
      </div>
    </>
  );
}
