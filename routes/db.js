const express = require('express');
const router = express.Router();
const mysql = require("mysql")

//Create connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "nodemysql"
});

//connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("MySql Connected...");
    db.query("select * from customer_data",(err)=>{
        if(err){
            sql = "create table customer_data(name varchar(255),email varchar(255) unique not null,phone varchar(22) unique not null,id int(10) unique not null auto_increment primary key);";
            db.query(sql);
            console.log("table created...");
        }
    })
})

//search api
router.get("/search",async(req,res)=>{
    let sql = 'select * from customer_data where email = "'+req.body.email+'";';
    db.query(sql,(err,result)=>{
        if(err){
            res.json({"result" : err});
        }
        res.json({"result":result});
    })
})

//delete api
router.post("/delete",async(req,res)=>{
    let sql = 'delete from customer_data where email = "'+req.body.email+'";';
    db.query(sql,(err,result)=>{
        if(err){
            res.json({"result" : err});
        }
        res.json({"result":result});
    })
})

//create api
router.post("/create",async(req,res)=>{
    let sql = 'insert into customer_data(name,email,phone) values("'+req.body.name+'","'+req.body.email+'",'+req.body.phone+');';
    console.log(sql);
    db.query(sql,(err,result)=>{
        if(err){
            res.json({"result" : err});
        }
        res.json({"result":result});
    })
})

module.exports = router;