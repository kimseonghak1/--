"use strict";

const id = document.querySelector("#id"),
  passwd = document.querySelector("#passwd"),
  loginBtn = document.querySelector("button");

loginBtn.addEventListener("click",login);
    
function login() {
    const req = { // 오브젝트 형태로 진행함.
      id:id.value,
      passwd:passwd.value
    };
    console.log(req);
    // fetch("/login", { // fetch("경로",{전달할 데이터});
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body: JSON.stringify(req)
    // });
}