const jwt=require('jsonwebtoken');

module.exports= (req,res,next)=>{
    try{
        console.log("req: ", req);
        var token=req.headers.authorization.split(' ')[1]; //Stripping Bearer out of the token
        console.log(token);
        jwt.verify(token,"MY_LONG_SECRET_KEY");
        next();
    }
    catch(err){
        return res.status(401).json({
            message: 'Unthorized access detected.'
        })
    }
}