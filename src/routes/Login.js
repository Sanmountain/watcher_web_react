import React, { useState } from "react";
import "../styles/Login.css";
import { signIn } from "../api/API";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user_id, setId] = useState("");
  const [user_password, setPw] = useState("");
  const [result, setResult] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSighIn = async (e) => {
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
      }

      localStorage.setItem("saveId", response.data.data[0].user_id);
      navigate("/main");
    } catch (err) {
      console.error(err);
      setErr("로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <h2>Watcher</h2>
        <form id="login-form" onSubmit={handleSighIn}>
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
            <input type="checkbox" id="remember-check" />
            ID 저장
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
}
