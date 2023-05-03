import React from "react";
import { NavLink } from "react-router-dom";

export default function Main() {
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
          <NavLink to="/vass">
            <button
              style={{
                cursor: "pointer",
                margin: "5px",
                width: "50px",
                height: "30px",
                border: "1px solid black",
              }}
            >
              VASS
            </button>
          </NavLink>
        </form>
      </div>
    </>
  );
}
