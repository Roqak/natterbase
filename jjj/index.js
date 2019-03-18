const express = require('express');
const app = express();
const passport = require('passport');
const jwt= require('jsonwebtoken');
const port = 3000;
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}));

let countries = [];

app.use(passport.initialize());
require('./auth')(passport);
app.post("/login",(req,res)=>{
    let username = "admin";
    let password = "admin";

        if(req.body.username === "admin"){
            if(password === req.body.password){
                // res.status(200).json({msg: "Login Successful"})
                const authUser = {
                    name: username,
                    password: password
                };
                jwt.sign(authUser,'secretIsaSecretee',(err,token)=>{
                    if(err){
                        // console.log(err);
                        res.status(401).json({err});
                    }else{
                        // console.log(token);
                        res.status(200).json({token});
                    }
                });
            }else{
                res.status(401).json({errorMsg:"Login not Successful"});
            }
        }else{
        res.status(401).json({errorMsg:"Login not Successful"});
        }
    });
app.put('/countries/:country',(req,res)=>{
    countries.push(req.params.country);
});
app.get('/countries',passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.status(200).json({countries});
});
app.delete('/countries/:country',(req,res)=>{
    countries.splice(req.params.country);
});
app.listen(port,()=>{
    console.log("Listening on port "+port);
});