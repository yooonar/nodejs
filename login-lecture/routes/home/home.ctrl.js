"use strict";

// 메인 페이지
const hello = (req, res) => {
    res.render("home/index");
};

// 로그인 페이지
const login = (req, res) => {
    res.render("home/login");
};

module.exports = {
    hello,
    login,
};
