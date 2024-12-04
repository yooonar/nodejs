"use strict";

const express = require("express");
const router = express.Router();

// 메인 페이지
router.get("/", (req, res) => {
    res.render("home/index");
});

// 로그인 페이지
router.get("/login", (req, res) => {
    res.render("home/login");
});

// 외부에서 사용 가능하도록 설정
module.exports = router;
