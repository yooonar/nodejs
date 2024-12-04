"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");

// 환경변수 모듈 (.env 파일)
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs"); // 뷰 엔진

// 현재디렉토리/src/public 을 정적 경로로 추가
app.use(express.static(`${__dirname}/src/public`));

// body Parser
app.use(bodyParser.json());
// url을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제를 해결해준다.
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home); // use: 미들웨어 등록해주는 메소드

module.exports = app; // app 내보내기
