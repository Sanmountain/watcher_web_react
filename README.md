# vass_lotte_web_react

<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
</div> <br />

> Vass Lotte 프론트엔드 repository입니다. <br />
> 배포주소 : http://43.202.131.180/

## 버전

- node v16
- npm v8
- react v18
- react-dom v18

## 설치 방법

```
git clone https://github.com/PairCompany/vass_lotte_web_react.git
npm install
npm start
```

## 작업

- `develop` 브랜치에서 기능 또는 페이지에 따라 로컬에서 브랜치 새로 따서 작업
- 해당 브랜치에서 작업 후 `develop` 브랜치에 merge
- `develop` 브랜치에서 `npm run build` 실행 후 build 파일 `develop` 브랜치에 push
- `master` 브랜치에서 `develop` 브랜치 merge

## 배포

- 로컬에서 `npm run build`를 통해 build 파일 생성 후 git에 push
- **master 브랜치**에 push할 경우 github Actions를 통해 AWS EC2로 build 폴더 **자동 배포**
