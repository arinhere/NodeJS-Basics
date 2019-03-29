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

//Update Product details
productRoutes.put('/update', checkAuth,(req,res,next)=>{
    var data=new product({//set product value posted from front end
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    })

    product.updateOne(
        {_id: req.body._id},
        data
    )
    .then(returnData=>{
        return res.status(200).json({
            message: 'Product Updated'
        })
    })
    .catch(err=>{
        return res.status(201).json({
            message: 'Unable to update product'
        })
    })
})

//Get products list
productRoutes.get("/",checkAuth,(req,res,next)=>{
    product.find({createdBy: req.userData.userId})
        .then(result=>{
            return res.status(200).json({
                body: result,
                count: result.count
            })
        })
})

productRoutes.get("/getProductByID/:id",checkAuth,(req,res,next)=>{
    product.findOne({_id: req.params.id})
        .then(result=>{
            return res.status(200).json({
                body: result,
                count: result.count
            })
        })
})

//Delete data from server
productRoutes.delete('/delete/:id',checkAuth,(req,res,next)=>{
    if(req.params.id){
        product.deleteOne({_id: req.params.id})
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

module.exports=productRoutes;