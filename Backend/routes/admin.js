const { Router } = require("express");
const createAdminrouter = Router();
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
require('dotenv').config();
const JWT_SECRET_ADMIN = process.env.JWT_SECRET;
const { z } = require("zod");
const jwt = require("jsonwebtoken")


createAdminrouter.post("/signup", async function (req, res) {

  // apply zod for input format style ;
  const requirebody = z.object({
    email: z.string().min(7).max(30).email(),
    password: z.string().min(5).max(30),
    firstName: z.string().min(5).max(30),
    lastName: z.string().min(5).max(30)

  })
  // success or not 
  const parsedatawithsuccess = requirebody.safeParse(req.body); // take all data from the body section 
  if (!parsedatawithsuccess.success) {
    res.json({
      message: " your input details are Invalid",
      error: parsedatawithsuccess.error
    })
  }


  const { email, password, firstName, lastName } = parsedatawithsuccess.data;

  // apply bcrypt 
  try {
    const password1 = await bcrypt.hash(password, 5);
    console.log(password1);

    await adminModel.create({
      email,
      password: password1,
      firstName,
      lastName
    });

    return res.status(201).json({
      message: "✅ You are signed up successfully!",
    });
  }
  catch (error) {
    console.log("Signup problem:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
})


createAdminrouter.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const admin = await adminModel.findOne({
      email
    })

    if (!admin) {
      res.status(403).json({
        message: " your emailid and password incorrect!!😒"
      })
    }
    const passwordmatch = await bcrypt.compare(password, admin.password);
    console.log(admin);

    if (passwordmatch) {
             const token = jwt.sign({
                 id:admin._id.toString()
             },JWT_SECRET_ADMIN)

             res.json({
                 token
             })
      console.log(token);
    }
    else{
          res.json({
               message:"invalid login details !!"
          })
    }
  }
  catch(error){
       console.log("Invalid details " , error.messgae);
       res.status(403).json({
        messsage:"Your login details are invalid"
       })    
  }
})

createAdminrouter.post("/createcourse", function (req, res) {


  res.json({
    message: "admin  endpoint create course"
  })

})

createAdminrouter.put("/changecourse", function (req, res) {

  res.json({
    message: "admin  endpoint change  of the course title and thumbnail"
  })

})


createAdminrouter.get("course/bulk", function (req, res) {

  res.json({
    message: "admin find out how  many course he was created and other things"
  })

})

module.exports = {
  createAdminrouter
}




