const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const db = require("./models")
// routers
const postRouter = require("./routes/postsRoute")
const commentRouter = require("./routes/commentsRoute")
const userRouter = require("./routes/usersRoute")
const likeRouter = require("./routes/likesRoute")

const app = express()
//middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

// routes
app.get("/", (req, res) => {
  res.send("hello here")
})
app.use("/posts", postRouter)
app.use("/comments", commentRouter)
app.use("/auth", userRouter)
app.use("/like", likeRouter)

db.sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 4000)
  })
  .catch((err) => {
    console.log(err)
  })