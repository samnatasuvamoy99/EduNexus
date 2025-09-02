   const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
   const jwt = require("jsonwebtoken");

function userMiddleware ( req , res , next){
        const token = req.headers.authorizationtoken;
        const decode = jwt.verify( token , JWT_SECRET_USER); // token base verify
        if( decode){
                req.userId =decode.id || decode._id;
                next()
        }
        else{
               res.status(403).json({
                   message:"you are not signin in !!"
               })
        }


      } 
      
      module.exports={
             userMiddleware
      }