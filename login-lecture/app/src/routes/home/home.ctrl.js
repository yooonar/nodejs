"use strict";

// 메인 페이지
const home = (req, res) => {
    res.render("home/index");
};

// 로그인 페이지
const login = (req, res) => {
    res.render("home/login");
};

module.exports = {
    home,
    login,
};
