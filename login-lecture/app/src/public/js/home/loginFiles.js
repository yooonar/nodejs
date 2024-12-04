"use strict";

// DOM (Document Object Model) 인터페이스
const id = document.querySelector("#id");
const psword = document.querySelector("#psword");
const loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", loginFiles);

function loginFiles() {
    const req = 
    {
        id: id.value,
        psword: psword.value,
    };
    
    fetch("/loginFiles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    // res.json()의 반환 값은 Promise(자바스크립트 비동기 처리에 사용되는 객체)이다.
    .then((res) => res.json()) // 응답 데이터 받아오기 Promise 타입
    // .then(console.log); // .then((res) => console.log(res)); 이거랑 같음 // res.json() 을 받아옴
    .then((res) => {
        if(res.success) {
            location.href = "/"; // 로그인 성공 시 메인 페이지로 이동
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => { // 예외 처리
        console.error("로그인 중 에러 발생"); // console.error(new Error("로그인 중 에러 발생"));
    });
}
