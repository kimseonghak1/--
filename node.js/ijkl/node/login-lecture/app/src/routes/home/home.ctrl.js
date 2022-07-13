"use strict";

/*
function hello(req, res){
    res.render("home/index");
}
function login(req,res){
    res.render("home/login");
}
*/

const output = {
     hello: (req, res)=>{
        res.render("home/index");
    },
     login: (req, res)=>{
        res.render("home/login");
    }
};

const users = {
    id: ["지원이는", "html", "node.js"],
    psword: ["뭐든지 잘한다","1234","123456"],
};

const process = {
    login:(req,res)=>{
        const id = req.body.id,
        psword = req.body.psword;

    if(users.id.includes(id)){
        const idx = users.id.indexOf(id);
        if(users.psword[idx] === psword) {
            return res.json({
                success: true,
            });
        }
    }

    return res.json({
        success: false,
        msg: "땡 틀렸습니다.",
    });
  },
};

module.exports = {
    output,
    process,
};