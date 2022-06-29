"use strict";

const hello = function(req, res) { // 클라이언트의 요청을 연결해주는 부분.
    res.render("home/index"); // 이 요청에 해당하는 기능을 수행
};

const login = function(req,res){
    res.render("home/login");
};

module.exports = {
    hello, // hello:hello
    login // login:login
};