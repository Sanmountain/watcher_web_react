import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { signIn } from "../api/API";
import { useNavigate } from "react-router-dom";
import logo from "../assets/JHC.png";
import logo2 from "../assets/logen.png";
import Swal from "sweetalert2";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const navigate = useNavigate();
  const [checkedId, setCheckedId] = useState(false);

  /* 로그인 시 실행 */
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn({
        user_id: userId,
        user_password: userPw,
      });

      console.log(response.data);

      if (response.data.result === "08") {
        Swal.fire({
          icon: "warning",
          title: "비밀번호를 확인해주세요",
          confirmButtonText: "확인",
        });
        navigate("/");
      } else if (response.data.result === "25") {
        Swal.fire({
          icon: "warning",
          title: "존재하지 않는 아이디입니다.",
          confirmButtonText: "확인",
        });
        navigate("/");
      } else {
        localStorage.setItem("saveId", response.data.data[0].user_id);
        localStorage.setItem("saveSaId", response.data.data[0].sa_id);
        localStorage.setItem("saveAcId", response.data.data[0].account_id);
        localStorage.setItem("bran_exp", response.data.data[0].bran_exp);
        /* id 저장 체크했을 때만 "id" 저장 */
        if (checkedId) {
          localStorage.setItem("id", response.data.data[0].user_id);
        } else {
          localStorage.removeItem("id");
          localStorage.removeItem("checkboxChecked");
        }
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
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "warning",
        title: "로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요",
        confirmButtonText: "확인",
      });
    }
  };

  /* id 저장 체크 시 실행 */
  const handleRememberIdChange = (e) => {
    setCheckedId(e.target.checked);
    localStorage.setItem("checkboxChecked", e.target.checked);
  };

  useEffect(() => {
    const savedId = localStorage.getItem("id");
    if (localStorage.getItem("checkboxChecked")) {
      setUserId(savedId);
      setCheckedId(true);
    }
  }, []);

  return (
    <>
      <div className="loginBody">
        <div className="login-wrapper">
          <div className="loginBox">
            <img src={logo2} className="AppLogo" alt="React" />
            <form id="login-form" onSubmit={handleSignIn}>
              <input
                type="text"
                name="userName"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="ID"
              />
              <input
                type="password"
                name="userPassword"
                value={userPw}
                onChange={(e) => setUserPw(e.target.value)}
                placeholder="Password"
              />
              <label>
                <input
                  type="checkbox"
                  id="remember-check"
                  onChange={handleRememberIdChange}
                  checked={checkedId}
                  style={{ marginRight: "3px" }}
                />
                ID 저장
              </label>
              <input type="submit" value="로그인" />
              <hr></hr>
              <img src={logo} className="bottomLogo" alt="React" />
              <div className="bottomCopy">Copyright © JHC 2021</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
