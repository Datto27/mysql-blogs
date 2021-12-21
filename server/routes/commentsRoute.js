const express = require("express")
const router = express.Router()
const { Comments } = require("../models")
const {validateToken} = require("../middleware/AuthMiddleware")


router.get("/:postId", (req, res) => {
  const postId = req.params.postId
  // console.log("post id: ", postId)
  Comments.findAll({where: {PostId: postId}})
    .then((data) => {
      // console.log(data)
      res.json({data})
    })
    .catch (err => {
      console.log(err)
    })
})

router.post("/", validateToken, (req, res) => {
  const comment = req.body
  // console.log("added comment: ", comment)
  const username = req.user.username
  comment.username = username

  Comments.create(comment)
    .then(() => {
      res.json(comment)
    })
    .catch(err => {
      console.log(err)
    })
})

router.delete("/:commentId", validateToken, async(req, res) => {
  const commentId = req.params.commentId
  Comments.destroy({where: {
    id: commentId,
  }})
  .then(() => { 
    res.json("deleted")
  })
  .catch(err => {
    res.json({error: err})
  })
})

module.exports = router