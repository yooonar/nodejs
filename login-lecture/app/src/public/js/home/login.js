"use strict";

// DOM (Document Object Model) 인터페이스
const id = document.querySelector("#id");
const psword = document.querySelector("#psword");
const loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
    const req = 
    {
        id: id.value,
        psword: psword.value,
    };
    
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    // res.json()의 반환 값은 Promise(자바스크립트 비동기 처리에 사용되는 객체)이다.
    .then((res) => res.json()) // 응답 데이터 받아오기 Promise 타입
    .then(console.log); // .then((res) => console.log(res)); 이거랑 같음 // res.json() 을 받아옴
    
}

// console.log(id);
