"use strict";

const { response } = require("../../../app");

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
const users = {
    id: ["test", "테스트", "테스터"],
    psword: ["11", "1111", "1234"],
};

// POST
const process = {
    login: (req, res) => {
        const id = req.body.id,
            psword = req.body.psword;
        const responseData = {}; // 응답 객체
        if(users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if(users.psword[idx] === psword) {
                responseData.success = true;
                return res.json(responseData);
            }
        }
        responseData.success = false;
        responseData.msg = "로그인 실패!";
        return res.json(responseData);
    },
};

module.exports = {
    output,
    process,
};
