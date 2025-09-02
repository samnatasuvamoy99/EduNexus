const JWT_SECRET_ADMIN= process.env.JWT_SECRET_ADMIN;
 const jwt = require("jsonwebtoken");

  const adminMiddleware = async( req , res , next) =>{
        
         try {
              const token = req.headers.authorizationtoken;
             if (!token){
                     return res.status(401).json({ message: "Token not provided" });
              }
             const decode = await jwt.verify( token , JWT_SECRET_ADMIN); // token base verify
             if( decode){
                     req.adminId = decode.id || decode._id;
                     next()
             }
             else{
                    res.status(403).json({
                        message:"you are not signin in !!"
                    })
             }
         } catch (error) {
                return res.status(401).json({ message: "Invalid or expired token", error: err.message });
         }

      } 
      
      module.exports={
          adminMiddleware
      }