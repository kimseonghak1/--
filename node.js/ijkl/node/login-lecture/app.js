// // express 안쓰고 서버 구축
// const http = require("http"); // http에서는 send 없고 end가 있음
// const app = http.createServer((req,res)=>{
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"});
//     if(req.url === "/") {
//         res.end("여기는 루트입니다.");
//     } else if(req.url === "/login"){
//         res.end("여기는 로그인창 입니다.");
//     }
// });

// app.listen(3001,()=>{
//     console.log("http로 가동된 서버입니다.");
// });

// 모듈
const express = require("express");
const app = express();

// 라우팅
const home = require("./routes/home"); // "./routes/home에 있는 자바스크립트를 읽어와줘"라는 뜻
// 앱 세팅
app.set("views", "./views");
app.set("view engine","ejs");


app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드  // "/"이 루트 경로에 오면 home으로 이동

module.exports = app;