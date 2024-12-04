"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// 메인 페이지
router.get("/", ctrl.hello);

// 로그인 페이지
router.get("/login", ctrl.login);

// 외부에서 사용 가능하도록 설정
module.exports = router;
