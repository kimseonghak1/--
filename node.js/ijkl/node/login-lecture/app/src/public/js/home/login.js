"use strict";

 // login.js와 /views/home/login.ejs 연결
// DOM -> Document Object Model
// 버튼이 눌릴때 데이터가 서버로 이동한다.

const id = document.querySelector("#id"),
    psword = document.querySelector("#psword"),
    loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login(){
    const req = {
        id : id.value,
        psword : psword.value
    };
    console.log(req);
}