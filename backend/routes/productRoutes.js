const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const productRoutes=express.Router();

const checkAuth=require('../middleware/auth-validator');
const product=require('../models/product');

//Add product
productRoutes.post('/add',checkAuth,(req,res,next)=>{
    var data=new product({//set product value posted from front end
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        createdBy: req.userData.userId //get the userid from token, as this route is protected
    })

    console.log(data);

    data.save()//save data in database
        .then(returnData=>{
            return res.status(200).json({
                message: "Product Added"
            })
        })
        .catch(err=>{
            return res.status(201).json({
                message: err
            })
        })
})

module.exports=productRoutes;