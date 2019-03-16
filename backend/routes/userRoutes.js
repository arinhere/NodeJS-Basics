const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userRoutes=express.Router();

const checkAuth=require('../middleware/auth-validator');
const PostData=require('../models/postData');

//Login and create JWT Token
userRoutes.post('/login',(req,res,next)=>{
    PostData.findOne({email: req.body.email})
        .then(result=>{
            if(result.password!=req.body.password){
                return res.status(401).json({
                    message: 'Invalid credentials',
                })
            }

            //create JWT
            var token=jwt.sign({email: req.body.email, userId: result._id},"MY_LONG_SECRET_KEY",{
                expiresIn: '1h'
            })

            return res.status(200).json({
                token: token
            })
        })
        .catch(err=>{
            return res.status(401).json({
                message: 'Invalid credentials',
                error: err
            })
        })
})

//Post Data to Server
userRoutes.post('/signup',(req,res,next)=>{
    //Using Password Encryption
    //bcrypt.hash(req.body.password, 10).then(hash => {
    //    const user = new PostData({
    //        firstName: req.body.firstName,
    //        lastName: req.body.lastName,
    //        email: req.body.email,
    //        password: hash
    //    });
    //    user
    //      .save()
    //      .then(result => {
    //        res.status(201).json({
    //          message: "User created!",
    //          result: result
    //        });
    //      })
    //      .catch(err => {
    //        res.status(500).json({
    //          error: err
    //        });
    //      });
    //  });

    var email=req.body.email;
    PostData.findOne({email: email},(err,response)=>{
        if(response){//If user exists
            return res.status(201).json({
                message: "Email already exists"
            })
        }

        //Else insert into db
        const data=new PostData({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
    
        data.save()
            .then(returnData=>{
                res.status(200).json({
                    message: "User Created",
                    body: returnData
                })
            })
            .catch(err=>{
                console.log("There is some error: ", err)
            })

    })
    
})

//Get Data from Server with token Authentication
userRoutes.get('/getData',checkAuth,(req,res,next)=>{ //use the app to send the response when it get requested from server
    //Remember that these query fields are optional
    var pageSize= +req.query.pageSize; //By default request params are string. Adding + to convert them to int
    var limit= +req.query.limit;

    const baseRoute=PostData.find(); //Narrowing down the results by defining the baseRoute
    if(pageSize && limit){
        baseRoute
            .skip(pageSize*(pageSize-1))
            .limit(limit)
    }
    baseRoute
        .then(result=>{
            res.status(200).json({
                message: result,
                //body: data
            })
        })    
})

//Delete data from server
userRoutes.delete('/deleteData/:name',checkAuth,(req,res,next)=>{
    if(req.params.name){
        PostData.deleteOne({name: req.params.name})
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message: result
            })
        },
        err=>{
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    }
    else{
        res.status(500).json({
            message: 'Error in processing request'
        })
    }
    
})

module.exports=userRoutes;