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


/*
// http 로 서버 가동.. 비추! express 사용하기!!
const http = require ("http"); // http로 서버 띄우기
const app = http.createServer((req, res) => {
    // console.log(req.url); // 루트 페이지의 경우 / 로 로그가 남는다. 라우팅 사용 가능
    
    // 한글 처리
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"});

    // 페이지 처리
    if(req.url === "/") {
        res.end("루트 페이지");
    } else if(req.url === "/login") {
        res.end("로그인 화면");
    }
});

app.listen(3001, () => {
    console.log("http로 서버 가동");
});
*/
