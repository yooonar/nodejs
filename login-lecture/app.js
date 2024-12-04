const express = require("express");
const app = express();

// 메인 페이지
app.get("/", (req, res) => {
    res.send("루트 페이지");
});

// 로그인 페이지
app.get("/login", (req, res) => {
    res.send("로그인 화면");
});

app.listen(3000, () => {
    console.log("서버 가동");
});
