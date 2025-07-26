const express = require("express");
const mongoose = require("mongoose");
// from routing 
const {userRouter} = require("./routes/user");
// routing in express , the express Router
const  {courseRoute} = require("./routes/course");
const {createAdminrouter} = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/admin", createAdminrouter);

//db connection
async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECT_URL)
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.error("❌MongoDB connection error:", error.message);
    });

  app.listen(3008)
}
main();
