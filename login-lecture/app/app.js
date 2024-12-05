"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");

// 환경변수 모듈 (.env 파일)
const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");
const logger = require("./src/config/logger");

const app = express();

// 라우팅
const home = require("./src/routes/home");

// winston 로거(www.js로 옮김)
// const logger = require("./src/config/logger");
// logger.error("hello!!"); // logger.log("info", "hello!");

// morgan 로그 관련 설정
const accessLogStream = require("./src/config/log");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs"); // 뷰 엔진

// 현재디렉토리/src/public 을 정적 경로로 추가
app.use(express.static(`${__dirname}/src/public`));

// body Parser
app.use(bodyParser.json());
// url을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제를 해결해준다.
app.use(bodyParser.urlencoded({ extended: true }));

// winston + morgan
app.use(morgan("tiny", { stream: logger.stream }))

// morgan
// app.use(morgan("common", { stream: accessLogStream })); // GET /login 304 7.130 ms - -
// app.use(morgan("dev", { stream: accessLogStream })); // GET /login 304 7.130 ms - -
// app.use(morgan("tiny")); // GET /login 200 832 - 9.814 ms
// app.use(morgan(":method :url :status :res[content-length] - :response-time ms")); // GET /login 304 - - 5.320 ms
// app.use(morgan("combined")); // ::1 - - [04/Dec/2024:22:45:14 +0000] "GET /login HTTP/1.1" 304 - "http://localhost:3000/register" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

app.use("/", home); // use: 미들웨어 등록해주는 메소드

module.exports = app; // app 내보내기
