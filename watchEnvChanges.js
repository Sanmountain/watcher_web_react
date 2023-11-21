require("dotenv").config();

const fs = require("fs");
const axios = require("axios");

const projectName = process.env.PROJECT_NAME;
const envFilePath = "./.env"; // .env 파일 경로
const jandiWebhookUrl =
  "https://wh.jandi.com/connect-api/webhook/17442844/f642e06ccad60d9291ebd3012ddef8d0"; // 잔디 웹훅 URL
const debounceTime = 2000; // 2초
let timeout;

const sendJandiNotification = (data) => {
  axios
    .post(jandiWebhookUrl, {
      body: `"${projectName}" 프로젝트 .env 파일이 변경되었습니다. 수정해주세요! \n\n${data}`,
    })
    .then(() => console.log(".env 파일 변경 알림이 잔디로 전송되었습니다."))
    .catch((error) => console.error("알림 전송 실패:", error));
};

// 파일 변경 감지 함수
const watchEnvFile = () => {
  fs.watch(envFilePath, (eventType) => {
    if (eventType === "change") {
      // 기존 타이머가 설정되어 있다면 초기화
      if (timeout) clearTimeout(timeout);

      // 새로운 타이머 설정
      timeout = setTimeout(() => {
        fs.readFile(envFilePath, "utf8", (err, data) => {
          if (err) {
            console.error("파일 읽기 실패:", err);
            return;
          }

          sendJandiNotification(data);
        });
      }, debounceTime);
    }
  });
};

watchEnvFile();
