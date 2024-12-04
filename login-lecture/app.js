"use strict";

// 모듈
const express = require("express");
const app = express();

// 상수
const PORT = 3000;

// 라우팅
const home = require("./routes/home");

// 앱 세팅
app.set("views", "./views");
app.set("view engine", "ejs"); // 뷰 엔진


app.use("/", home); // use: 미들웨어 등록해주는 메소드

app.listen(PORT, () => {
    console.log("서버 가동");
});
