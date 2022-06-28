const express = require("express");
const app =express();

app.get("/",function(req, res){
    res.send("여기는 루트입니다.");
});

app.get("/login",function(req,res){
    res.send("여기는 로그인 화면입니다.");
})

app.listen(3000, function() { // () => 
    console.log("서버 가동");
});
