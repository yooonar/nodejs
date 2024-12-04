"use strict";

const express = require("express");
const router = express.Router();

// 컨트롤러 연결
const ctrl = require("./home.ctrl");

// 메인 페이지
router.get("/", ctrl.output.home);

// 로그인 페이지
router.get("/login", ctrl.output.login);
router.post("/login", ctrl.process.login);
router.get("/loginFiles", ctrl.output.loginFiles);
router.post("/loginFiles", ctrl.process.loginFiles);

// 회원가입 페이지
router.get("/register", ctrl.output.register);
router.post("/register", ctrl.process.register);
router.get("/registerFiles", ctrl.output.registerFiles);
router.post("/registerFiles", ctrl.process.registerFiles);

// 외부에서 사용 가능하도록 설정
module.exports = router;
