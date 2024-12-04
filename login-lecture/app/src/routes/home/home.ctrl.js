"use strict";

const UserStorage = require("../../models/UserStorage");

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
        const id = req.body.id,
            psword = req.body.psword;

        // const userStorage = new UserStorage(); // 굳이 생성하지 않아도 될듯?
        // console.log(UserStorage.users);
        const users = UserStorage.getUsers("id", "psword");
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
