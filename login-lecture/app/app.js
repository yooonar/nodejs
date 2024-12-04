"use strict";

// 모듈
const express = require("express");
const app = express();

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs"); // 뷰 엔진

// 현재디렉토리/src/public 을 정적 경로로 추가
app.use(express.static(`${__dirname}/src/public`));

app.use("/", home); // use: 미들웨어 등록해주는 메소드

module.exports = app; // app 내보내기