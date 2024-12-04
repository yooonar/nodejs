"use strict";

const UserStorage = require("./UserStorage");

// 인스턴스(new User(req.body))로 만듦 
class User {
    // 생성자
    constructor(body) {
        this.body = body;
    }

    // 로그인 메소드
    login() {
        const body = this.body;
        const { id, psword } = UserStorage.getUserInfo(body.id); // body.id == 클라이언트에서 입력한 id 값
        if(id) { // id가 userStorage에 있으면
            if(id === body.id && psword === body.psword) { // 로그인 체크
                return { success: true }; // 로그인 성공
            }
            return { success: false, msg: "비밀번호 오류" };
        }
        return { success: false, msg: "존재하지 않는 아이디" };
    }
}

module.exports = User;
