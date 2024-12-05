"use strict";

// const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");
const UserFiles = require("../../models/UserFiles");

const logger = require("../../config/logger");

// GET
const output = {
    home: (req, res) => { // 메인 페이지
        logger.info(`GET / 304 "홈 화면으로 이동"`); // 200 -> 304 참고 키워드 "http 상태 코드 mdn"
        res.render("home/index");
    },

    login: (req, res) => { // 로그인 페이지
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login");
    },

    register: (req, res) => { // 회원가입 페이지
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register");
    },

    loginFiles: (req, res) => { // 로그인 페이지
        logger.info(`GET /loginFiles 304 "로그인F 화면으로 이동"`);
        res.render("home/loginFiles");
    },

    registerFiles: (req, res) => { // 회원가입 페이지
        logger.info(`GET /registerFiles 304 "회원가입F 화면으로 이동"`);
        res.render("home/registerFiles");
    },
};

// POST
const process = {
    login: async (req, res) => {
        const user = new User(req.body); // 클라이언트에서 받은 request data인 req.body를 넘겨줌
        const responseData = await user.login(); // 로그인 체크
        const url = {
            method: "POST",
            path: "/login",
            status: responseData.err ? 400 : 200,
        }
        log(responseData, url);
        return res.status(url.status).json(responseData);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const responseData = await user.register(); // 클라이언트에서 받은 request data인 req.body를 넘겨줌
        const url = {
            method: "POST",
            path: "/register",
            status: responseData.err ? 409 : 201, // 409: 이미 존재하는 아이디(충돌) 201: 새로운 데이터가 생성됨
        }
        log(responseData, url);
        return res.status(url.status).json(responseData); // 회원가입 체크
    },
    loginFiles: async (req, res) => {
        const user = new UserFiles(req.body); // 클라이언트에서 받은 request data인 req.body를 넘겨줌
        const responseData = await user.loginFiles(); // 로그인 체크
        const url = {
            method: "POST",
            path: "/loginFiles",
            status: responseData.err ? 400 : 200,
        }
        log(responseData, url);
        return res.status(url.status).json(responseData);
    },
    registerFiles: async (req, res) => {
        const user = new UserFiles(req.body);
        const responseData = await user.registerFiles(); // 클라이언트에서 받은 request data인 req.body를 넘겨줌
        const url = {
            method: "POST",
            path: "/registerFiles",
            status: responseData.err ? 409 : 201, // 409: 이미 존재하는 아이디(충돌) 201: 새로운 데이터가 생성됨
        }
        log(responseData, url);
        return res.status(url.status).json(responseData); // 회원가입 체크
    }
};

module.exports = {
    output,
    process,
};

// 로그 함수
const log = (responseData, url) => {
    
    if(responseData.err) {
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${responseData.success} ${responseData.err}`
        );
    } else {
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${responseData.success} ${responseData.msg || ""}`
        );
    }
}
