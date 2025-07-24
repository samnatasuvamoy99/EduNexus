const {Router} = require(express);
 const  createAdminrouter = Router();

 createAdminrouter.post ( "/signup" , function( req ,res){

   res.json({
     message:"admin signup endpoint"
   })

 })

  createAdminrouter.post ("/sigin" , function( req ,res){

   res.json({
     message:"admin sigin endpoint"
   })

 })

 createAdminrouter.post ( "/createcourse" , function( req ,res){

   res.json({
     message:"admin  endpoint create course"
   })

 })
 
 createAdminrouter.put("/changecourse" , function( req ,res){

   res.json({
     message:"admin  endpoint change  of the course title and thumbnail"
   })

 })
 

 createAdminrouter.get( "/course/bulk" , function( req ,res){

   res.json({
     message:"admin find out how  many course he was created and other things"
   })

 })

 module.exports={
   createAdminrouter
 }
 



