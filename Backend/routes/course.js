   const { Router} = require("express");
   const courseRoute = Router();
   const { userMiddleware} =  require("../middleware/user");
   const {purchasesMOdel, courseMOdel} = require("../db");

      courseRoute.post("/purchases", userMiddleware, async function( req , res){
     // when user purchases any course that previews
        const userId = req.body.userId;
         const courseId = req.body.courseId;

         // check user pay or not  then create 

        const purchasesDetails=  await purchasesMOdel.create({
                   userId  : userId,
                   courseId: courseId
          })
          res.json({
                  purchasesDetails,
                  message:"you have successfully bought the course"
          })
       
})

 courseRoute.get("/Peviews" ,  async function( req , res){
              const courses = await courseMOdel.find({});
               res.json({
                       courses
               })
      res.json({
           message:"website course peviews"
      })
})

   module.exports = {
          courseRoute
   }