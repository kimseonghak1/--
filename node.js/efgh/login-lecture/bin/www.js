"use strict";

//포트
const PORT = 3000;

const app = require("../app");

app.listen(PORT, function() { // () => 
    console.log("서버 가동");
});