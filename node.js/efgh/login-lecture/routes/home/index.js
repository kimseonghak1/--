"use strict";

const express = require("express");
const router = express.Router();

//앱 세팅
router.get("/",hello);

router.get("/login",login);

module.exports = router;