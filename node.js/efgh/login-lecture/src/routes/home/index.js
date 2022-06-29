"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl"); // 컨트롤러 파일을 불러와서

//앱 세팅
router.get("/",ctrl.hello); 
router.get("/login",ctrl.login);

module.exports = router;