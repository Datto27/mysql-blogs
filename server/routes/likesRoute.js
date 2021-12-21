const express = require("express")
const router = express.Router()
const { Likes } = require("../models")
const {validateToken} = require("../middleware/AuthMiddleware")

router.post("/", validateToken, async(req,res) => {
  const {postId} = req.body
  const userId = req.user.id

  const foundLike = await Likes.findOne({
    where: {PostId:postId, UserId:userId}
  })
  
  if (!foundLike) {
    await Likes.create({PostId:postId, UserId:userId,})
    .then(() => {
      res.json({liked: true})
    })
    .catch (err => {
      console.log(err)
    })
  } else {
    await Likes.destroy({where: {PostId:postId, UserId:userId}})
    .then(() => {
      res.json({liked: false})
    })
    .catch (err => {
      console.log(err)
    })
  }

})

module.exports = router