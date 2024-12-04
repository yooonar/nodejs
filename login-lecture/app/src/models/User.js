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
        const client = this.body;
        const { id, psword } = UserStorage.getUserInfo(client.id); // body.id == 클라이언트에서 입력한 id 값
        if(id) { // id가 userStorage에 있으면
            if(id === client.id && psword === client.psword) { // 로그인 체크
                return { success: true }; // 로그인 성공
            }
            return { success: false, msg: "비밀번호 오류" };
        }
        return { success: false, msg: "존재하지 않는 아이디" };
    }

    // 회원가입 메소드
    register() {
        const client = this.body;
        const responseData = UserStorage.save(client); // 받은 값 그대로 넘겨주기
        return responseData;
    }
}

module.exports = User;
