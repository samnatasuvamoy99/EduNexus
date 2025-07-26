const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


 // user  Schema
const userSchema = new Schema({
      email:{type:String , unique:true},
      password : String,
      firstName : String,
      lastName : String

})

// admin Schema 
const adminSchema = new Schema ({
      email:{type:String , unique:true},
      password : String,
      firstName : String,
      lastName : String
})

//course Schema
const courseSchema = new Schema({
         title: String ,
         description :String ,
         price:Number,
          imageUrl:String,
          creatorId:ObjectId
})


// purchases Schema 
  const purchsesSchema = new Schema({
         title:String,
        userId: ObjectId,
        courseId:ObjectId

  })

  //admin course content todo
 /* const coursecontent = new Schema({

  })
 */

  const userModel = mongoose.model("user" , userSchema);
  const adminModel = mongoose.model("admin" , adminSchema);
  const courseMOdel= mongoose.model("course" , courseSchema);
  const  purchasesMOdel = mongoose.model("purchases" , purchsesSchema);

module.exports={
  userModel ,
  adminModel,
  courseMOdel,
  purchasesMOdel
}
