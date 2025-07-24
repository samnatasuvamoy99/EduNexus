 const {Router} = require("express");

 const userRouter = Router();

    userRouter.post("/signup", function (req, res) {

        res.json({
            message: "signup endpoint"
        })
    })

    userRouter.post("/signin", function (req, res) {

        res.json({
            message: "sigin endpoint"
        })
    })

    userRouter.get("/purchases", function (req, res) {

        res.json({
            message: "user purchases course details"
        })

    })


module.exports = {
     userRouter
}