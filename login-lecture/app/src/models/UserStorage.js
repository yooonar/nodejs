"use strict";

// DB로 저장하는 방법
const db = require("../config/db");

class UserStorage {
    // 아이디에 해당하는 데이터 가져오기
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(err); // 실패
                resolve(data[0]); // 성공
            });
        });
    }

    // 회원 가입
    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
            db.query(
                query, 
                [userInfo.id, userInfo.name, userInfo.psword], 
                (err) => {
                    if (err) reject(`${err}`); // 실패
                    resolve( { success: true }); // 성공
            });
        });
    }
}

module.exports = UserStorage;
