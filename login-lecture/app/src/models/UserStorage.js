"use strict";

const fs = require("fs").promises; // file system. /src/databases/user.json 파일을 불러오기 위한 모듈
// .promises 를 추기하면 Promise 형태로 반환해서 유지보수 하기 용이해짐(Promise가 수행하는 동작이 끝남과 동시에 상태를 알려주기 때문에 비동기 처리에 효과적)

class UserStorage {
    // 은닉화 된 변수나 메소드는 항상 클래스 최상단에 위치할 것!
    // 은닉화 된 회원 정보 메소드(가독성을 위해 나눠줌)
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id); // 아이디의 인덱스
        const usersKeys = Object.keys(users); // [id, psword, name] // users의 키 값들만 모아놓은 리스트
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }

    static getUsers(...fields) {
        // const users = this.#users;
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
        return fs.readFile("./src/databases/users.json") // Promise 타입의 데이터
            .then((data) => { // 성공
                return this.#getUserInfo(data, id); // 은닉화 된 회원 정보 메소드(가독성을 위해 나눠줌)
            })
            .catch(console.error); // .catch((err) => console.error(err)); // 실패
    }

    // 회원 가입
    static save(userInfo) {
        // const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        return { success: true };
    }
}

module.exports = UserStorage;
