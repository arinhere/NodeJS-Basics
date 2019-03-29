const express = require('express');//import express to the app
const parser = require('body-parser');//install from npm install --save body-parser
const mongoose = require('mongoose');
var userRoutes=require('./routes/userRoutes');
var productRoutes=require('./routes/productRoutes');

//MongoDB / arinhere / .
const app= express();//making it an express app

//mongoose.connect('mongodb://localhost:27017/AngularDB',()=>{
mongoose.connect('mongodb://arin:arin123@ec2-3-83-188-115.compute-1.amazonaws.com:27017/ngrxDB',()=>{
    console.log("Connected to the database")
},
err=>{
    console.log("Unable to connect to the database")
});

//For mongoDB server use the follwoing
// mongoose.connect("mongodb+srv://arin:YrpkHmBlrNyiEaiR@demonodecluster-z1h0c.mongodb.net/NodeMongoDB?retryWrites=true",()=>{
//     console.log("Database connected")
// },
// err=>{
//     console.log("Unable to connect to Database");
// })


app.use(parser.json());//Add it to the app

app.use((req,res,next)=>{ // Set the header settings to be used to send and receive data. This is very important. As it will remove CORS error
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();//Next is important here, as after manilulating the request from client, it will have to send the updated request to the respective methods
})

//Mention Routes here
app.use('/api/user',userRoutes);
app.use('/api/products',productRoutes);


module.exports=app; //export app
