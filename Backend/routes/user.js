const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
 require('dotenv').config();
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
const { z } = require("zod");
const jwt = require("jsonwebtoken")


userRouter.post("/signup", async function (req, res) {

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

        await userModel.create({
            email,
            password: password1,
            firstName,
            lastName
        });

        return res.status(201).json({
            message: "✅ You are signed  successfully!",
        });
    }
    catch (error) {
        console.log("Signup problem:", error.message);
        return res.status(500).json({
            error: "Something went wrong. Please try again later.",
        });
    }
})

userRouter.post("/signin", async function (req, res) {

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await userModel.findOne({
            email
        })

        if (!user) {
            res.status(403).json({
                message: " your emailid and password incorrect!!😒"
            })
        }
        const passwordmatch = await bcrypt.compare(password, user.password);
        console.log(user);

        if (passwordmatch) {
            const token = jwt.sign({
                id: user._id.toString()
            }, JWT_SECRET_USER)

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
        console.log("Invalid details Please try again later", error.messgae);
        res.status(403).json({
            messsage: "Your login details are invalid"
        })
    }
})

userRouter.get("/purchases", function (req, res) {

    res.json({
        message: "user purchases course details"
    })

})


module.exports = {
    userRouter
}