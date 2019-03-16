const jwt=require('jsonwebtoken');

module.exports= (req,res,next)=>{
    try{
        var token=req.headers.authorization.split(' ')[1]; //Stripping Bearer out of the token
        var decodedToken=jwt.verify(token,"MY_LONG_SECRET_KEY");
        req.userData={email: decodedToken.email, userId: decodedToken.userId};//Get the logged in user data and save it to request params by adding new field userData
        next();
    }
    catch(err){
        return res.status(401).json({
            message: 'Unthorized access detected.'
        })
    }
}