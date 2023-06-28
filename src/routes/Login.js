import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { signIn } from "../api/API";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const initialRememberId = localStorage.getItem("rememberId") === "true";
  const [user_id, setId] = useState(localStorage.getItem("saveId") || "");
  const [user_password, setPw] = useState("");
  const [rememberId, setRememberId] = useState(initialRememberId);
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleRememberId = (e) => {
    const isChecked = e.target.checked;
    setRememberId(isChecked);
    localStorage.setItem("rememberId", isChecked);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn({ user_id, user_password });

      console.log(response.data);
      setResult(response.data.message);

      if (response.data.result === "08") {
        alert("비밀번호를 확인해주세요.");
        navigate("/");
      } else if (response.data.result === "25") {
        alert("존재하지 않는 아이디입니다.");
        navigate("/");
      } else {
        alert("로그인 성공");
        setIsLoggedIn(true);
        if (rememberId) {
          localStorage.setItem("saveId", user_id);
        } else {
          localStorage.removeItem("saveId");
        }
      }
      localStorage.setItem("saveId", response.data.data[0].user_id);
      localStorage.setItem("saveSaId", response.data.data[0].sa_id);
      localStorage.setItem("saveAcId", response.data.data[0].account_id);
      localStorage.setItem("bran_exp", response.data.data[0].bran_exp);
      navigate("/work");
      console.log(
        "saveId:" +
          localStorage.getItem("saveId") +
          ", saveSaId:" +
          localStorage.getItem("saveSaId") +
          ", saveAcId:" +
          localStorage.getItem("saveAcId") +
          ", bran_exp:" +
          localStorage.getItem("bran_exp")
      );
    } catch (error) {
      console.error(error);
      alert("로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <h2>Watcher</h2>
        <form id="login-form" onSubmit={handleSignIn}>
          <input
            type="text"
            name="userName"
            value={user_id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
          />
          <input
            type="password"
            name="userPassword"
            value={user_password}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
          />
          <label>
            <input
              type="checkbox"
              id="remember-check"
              checked={rememberId}
              onChange={handleRememberId}
            />
            ID 저장
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
}
