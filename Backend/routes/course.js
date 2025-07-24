   const { Router} = require("express");

      const courseRoute = Router();
       
      courseRoute.get("/purchases" , function( req , res){

      res.json({
           message:"when users purchases any course"
      })
})

 courseRoute.get("/reviews" , function( req , res){

      res.json({
           message:"website course reviews"
      })
})

   module.exports = {
          courseRoute
   }