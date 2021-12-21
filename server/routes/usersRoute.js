const express = require("express")
const router = express.Router()
const {Users} = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken")
const { validateToken } = require("../middleware/AuthMiddleware")


router.post("/", async (req, res) => {
  const {username, password} = req.body
  await bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash
    })
    res.json("Success")
  })
})

router.post("/login", async (req, res) => {
  const {username, password} = req.body
  const user = await Users.findOne({where: {username: username}})
  if (!user) {
    res.json({error: "User doesn't exists"})
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) return res.json({error: "Wrong username or password"})

      const accessToken = sign({username:user.username, id:user.id}, "imposterzxcola")
      // tokenis gagzavna frontshi
      res.json({token:accessToken, username:username, id:user.id})
    })
  }
})
// get curent user
router.get("/check-user", validateToken, (req, res) => {
  res.json(req.user)
})

// single user
router.get("/profile/:id", async (req, res) => {
  const id = req.params.id
  // attributes - romeli field-ebic ar gvinda rom tsamovigot
  Users.findByPk(id, {attributes: {exclude: ["password"]}})
    .then((data) => {
      res.json(data)
    })  
    .catch(err => {
      console.log(err)
    })
})

// change password
router.patch("/change-password", validateToken, async (req, res) => {
  const {oldPassword, newPassword} = req.body
  const userId = req.body
  console.log(userId)
  const user = await Users.findOne({where: {username: req.user.username}})
  bcrypt.compare(oldPassword, user.password).then( async(match) => {
    if (!match) return res.json({error: "Wrong password !!!"})
    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update({password:hash}, {where: {id:user.id}})
      .then(() => {
        res.json("PASSSWORD SUCCESSFULLY CHANGED")
      })
      .catch((err) => {
        res.json(err)
      })
    })
  })
})

module.exports = router