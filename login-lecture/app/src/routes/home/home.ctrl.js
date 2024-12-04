"use strict";

// const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");

// GET
const output = {
    home: (req, res) => { // 메인 페이지
        res.render("home/index");
    },
    login: (req, res) => { // 로그인 페이지
        res.render("home/login");
    },
};

// 임시 회원 데이터


// POST
const process = {
    login: (req, res) => {
        const user = new User(req.body); // 클라이언트에서 받은 request data인 req.body를 넘겨줌
        const responseData = user.login(); // 로그인 체크
        return res.json(responseData);
    },
};

module.exports = {
    output,
    process,
};
