"use strict";

const UserStorage = require("./UserStorage");

// 인스턴스(new User(req.body))로 만듦 
class User {
    // 생성자
    constructor(body) {
        this.body = body;
    }

    // 로그인 메소드
    async login() { // async 비동기 함수로 변경
        const client = this.body;
        const {id, psword} = await UserStorage.getUserInfo(client.id); // body.id == 클라이언트에서 입력한 id 값
        // await 은 Promise를 반환하는 애만 가능하다! 응답이 올 때까지 기다려라!
        // 이 때 이 메소드를 실행하는 시간도 걸리기 때문에 컨트롤러(home.ctrl.js)에도 await을 반드시 걸어줘야 한다.

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
