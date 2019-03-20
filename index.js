const express = require('express');
const app = express();
const passport = require('passport');
const jwt= require('jsonwebtoken');
const port = 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
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
app.put('/countries/:country',passport.authenticate('jwt', { session: false }),(req,res)=>{
    if(!countries.includes(req.params.country)){
        countries.push(req.params.country);
        res.status(200).json({countries});
    }else{
        res.status(200).json({"response":"ERROR COUNTRY EXISTS"});
    }
    
});
app.get('/countries',passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.status(200).json({countries});
});
app.delete('/countries/:country',passport.authenticate('jwt', { session: false }),(req,res)=>{
    while (countries.indexOf(req.params.country) !== -1) {
        countries.splice(countries.indexOf(req.params.country), 1);
      }
    res.status(200).json({countries});
});
app.listen(port,()=>{
    console.log("Listening on port "+port);
});

module.exports = app;