const { Router } = require("express");
const createAdminrouter = Router();
const { adminModel } = require("../db");
const { courseMOdel } = require("../db");
const bcrypt = require("bcrypt");
require('dotenv').config();
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin.js")


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
        id: admin._id.toString()
      }, JWT_SECRET_ADMIN)

      res.json({
        token
      })
      console.log(token);
    }
    else {
      res.json({
        message: "invalid login details !!"
      })
    }
  }
  catch (error) {
    console.log("Invalid details ", error.messgae);
    res.status(403).json({
      messsage: "Your login details are invalid",
      error: error.message
    })
  }
})


createAdminrouter.post("/createCourse", adminMiddleware, async function (req, res) {
  try {
    const adminId = req.adminId;
    const { title, description, imageUrl, price } = req.body;

    if (!title || !description || !imageUrl || !price) {
      return res.json({
        message: "please Input valid details"
      })
    }
    const course = await courseMOdel.create({
      title, description, imageUrl, price, creatorId: adminId
    })

    res.json({
      message: " you create a course successfully !!",
      courseId: course._id
      
    })
  } catch (error) {
    return res.status(403).json({
      message: "Invalid details or Expired token",
      error: error.message

    })
  }

})


createAdminrouter.put("/changeCourseDetails", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;
  console.log(adminId);
  try {
    const admin = { title, description, imageUrl, price, courseId } = req.body;
    console.log(admin);

    await courseMOdel.updateOne(
      {
        _id: courseId,
        creatorId: adminId
      },
      {
        title,
        description,
        imageUrl,
        price
      })

    res.json({
      message: "Edit your course successfully !!",
      courseId
    })
  } catch (error) {
    return res.status(403).json({
      message: "Invalid details or Expired token",
      error: error.message

    })
  }
})

createAdminrouter.get("/courseView", adminMiddleware, async function (req, res) {

  const adminId = req.adminId;
  console.log(adminId);
  try {
    const course = await courseMOdel.findOne(
      {
        creatorId: adminId
      });
     
         if ( !course){
              res.json({
                    message:"Something went wrong Please try again later"
              })
         }

    res.json({
      message: "view your course successfully !!",
      course
    })
  } catch (error) {
    return res.status(403).json({
      message: "Invalid details or Expired token",
      error: error.message

    })
  }
})

createAdminrouter.delete("/courseDelete", adminMiddleware, async function (req, res) {
  try {
    const courseId = req.courseId;
    await courseMOdel.deleteOne({
      courseId
    })
    res.status(200).json({
      message: "Delete a course successfully "
    })
  } catch (error) {
    return res.json({
      message: "Something went to be wrong or Invalid token",
      error: error.message
    })
  }
})

module.exports = {
  createAdminrouter
}




