"use strict";

// 파일로 저장하는 방법
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

    // 은닉화 된 모든 유저 정보 메소드
    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data); // 버퍼 데이터 형식인 data를 Json형식으로 파싱
        if(isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => { // reduce 반복문
            if(users.hasOwnProperty(field)) { // users object에 field 키 값(id, psword)이 있는지 확인
                newUsers[field] = users[field]; // 키 값에 값 넣기
                // { id: [ 'test', '테스트', '테스터' ], psword: [ '11', '1111', '1234' ] }
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    // 모든 유저 정보를 가져오는 메소드
    static getUsers(isAll, ...fields) {
        return fs.readFile("./src/databases/users.json")  // Promise 타입의 데이터
            .then((data) => { // 성공. data: buffer 형식
                return this.#getUsers(data, isAll, fields); // 은닉화 된 회원 정보 메소드(가독성을 위해 나눠줌)
            })
            .catch(console.error);  // .catch((err) => console.error(err)); // 실패
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
    static async save(userInfo) {
        // this.getUsers(true) == 모든 데이터를 가져온다. this.getUsers("id", "psword", "name"); 와 같음
        const users = await this.getUsers(true); // 기존 데이터 모두를 object 형식으로 가지고 있음

        if(users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다.";
        }

        // userInfo.id 데이터가 users 파일 안에 없을 때만 저장
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users)); // users object를 json 형태로 저장

        return { success: true };
    }
}

module.exports = UserStorage;
