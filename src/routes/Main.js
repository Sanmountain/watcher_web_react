import React from "react";
import { NavLink } from "react-router-dom";
import { getCameraList } from "../api/API_camera";
import { autoCheck } from "../api/API";

export default function Main() {
  /* 카메라 정보 조회 */
  const useCameraView = async () => {
    try {
      const response = await getCameraList({});
      if (response.data.result === "00") {
        console.log(response.data);
        sessionStorage.setItem("authToken", response.data.authToken);
        sessionStorage.setItem("authorization", response.data.authorization);

        const listJsonString = JSON.stringify(response.data.list);

        sessionStorage.setItem("cam_ids", listJsonString);
      } else {
        alert("조회 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* Auto 체크 */
  const useAutoCheck = async () => {
    try {
      const bran_cd = sessionStorage.getItem("saveId");
      const response = await autoCheck({
        bran_cd: bran_cd,
      });
      if (response.data.result === "00") {
        console.log(response.data);

        const autoJsonString = JSON.stringify(response.data.data);
        sessionStorage.setItem("auto", autoJsonString);

        console.log(sessionStorage.getItem("auto"));
      } else {
        alert("조회 실패");
      }
    } catch (error) {
      console.error(error);
    }
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
              onClick={useAutoCheck}
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
              onClick={useCameraView}
            >
              VASS
            </button>
          </NavLink>
          <NavLink to="/test">
            <button
              style={{
                cursor: "pointer",
                margin: "5px",
                width: "50px",
                height: "30px",
                border: "1px solid black",
              }}
            >
              TEST
            </button>
          </NavLink>
        </form>
      </div>
    </>
  );
}
