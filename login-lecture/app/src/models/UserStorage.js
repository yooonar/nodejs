"use strict";

class UserStorage {
    static #users = { // static 정적 변수 선언. 변수 이름 앞에 # 을 하면 은닉화 됨
        id: ["test", "테스트", "테스터"],
        psword: ["11", "1111", "1234"],
        name: ["관리자", "유저1", "유저2"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => { // reduce 반복문
            // console.log(newUsers, field);
            if(users.hasOwnProperty(field)) { // users object에 field 키 값(id, psword)이 있는지 확인
                newUsers[field] = users[field]; // 키 값에 값 넣기
                // { id: [ 'test', '테스트', '테스터' ], psword: [ '11', '1111', '1234' ] }
            }
            return newUsers;
        }, {}); // {}: object 에 넣기
        return newUsers;
    }

    // 아이디에 해당하는 데이터 가져오기
    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id); // 아이디의 인덱스
        const usersKeys = Object.keys(users); // [id, psword, name] // users의 키 값들만 모아놓은 리스트
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }

    // 회원 가입
    static save(userInfo) {
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        return { success: true };
    }
}

module.exports = UserStorage;
