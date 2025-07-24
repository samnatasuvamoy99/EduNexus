const express = require("express")
const{userRouter} = require("./routes/user");
// routing in express , the express Router
const { courseRoute} = require("./routes/course");
const {createAdminrouter} = require("./routes/admin");
// from routing 
const app = express();

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/course" , courseRoute);
app.use("/api/v1/admin" , createAdminrouter);

app.listen(3005)