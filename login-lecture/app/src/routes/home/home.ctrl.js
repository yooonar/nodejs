"use strict";

// const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");
const UserFiles = require("../../models/UserFiles");

// GET
const output = {
    home: (req, res) => { // 메인 페이지
        res.render("home/index");
    },
    login: (req, res) => { // 로그인 페이지
        res.render("home/login");
    },
    register: (req, res) => { // 회원가입 페이지
        res.render("home/register");
    },
    loginFiles: (req, res) => { // 로그인 페이지
        res.render("home/loginFiles");
    },
    registerFiles: (req, res) => { // 회원가입 페이지
        res.render("home/registerFiles");
    },
};

// POST
const process = {
    login: async (req, res) => {
        const user = new User(req.body); // 클라이언트에서 받은 request data인 req.body를 넘겨줌
        const responseData = await user.login(); // 로그인 체크
        return res.json(responseData);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const responseData = await user.register(); // 클라이언트에서 받은 request data인 req.body를 넘겨줌
        return res.json(responseData); // 회원가입 체크
    },
    loginFiles: async (req, res) => {
        const user = new UserFiles(req.body); // 클라이언트에서 받은 request data인 req.body를 넘겨줌
        const responseData = await user.loginFiles(); // 로그인 체크
        return res.json(responseData);
    },
    registerFiles: async (req, res) => {
        const user = new UserFiles(req.body);
        const responseData = await user.registerFiles(); // 클라이언트에서 받은 request data인 req.body를 넘겨줌
        return res.json(responseData); // 회원가입 체크
    }
};

module.exports = {
    output,
    process,
};
