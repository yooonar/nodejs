"use strict";

const UserStorage = require("./UserStorage"); // DB

// 인스턴스(new User(req.body))로 만듦 
class User {
    // 생성자
    constructor(body) {
        this.body = body;
    }

    // 로그인 메소드
    async login() { // async 비동기 함수로 변경
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);
            
            if(user) { // user가 DB에 있으면
                if(user.id === client.id && user.psword === client.psword) { // 로그인 체크
                    return { success: true }; // 로그인 성공
                }
                return { success: false, msg: "비밀번호 오류" };
            }
            return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch(err) {
            return { success: false, msg: err };
        }
    }

    // 회원가입 메소드
    async register() {
        const client = this.body;
        try {
            const responseData = await UserStorage.save(client); // 받은 값 그대로 넘겨주기
            return responseData;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = User;
