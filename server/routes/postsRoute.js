const express = require("express")
const router = express.Router()
const {Posts, Likes} = require("../models")

const { validateToken } = require("../middleware/AuthMiddleware")
// req.user comes from middleware (validToken)
router.get("/", validateToken, async (req, res) => {
  // console.log("user --> ", req.user)
  const listOfPosts = await Posts.findAll({include:[Likes]})
  // get posts wich is liked from current user
  const likedPosts = await Likes.findAll({where: {UserId: req.user.id}})

  res.json({listOfPosts:listOfPosts, likedPosts:likedPosts})
})

router.get("/postById/:id", async (req, res) => {
  const id = req.params.id
  // console.log(id)
  // findByPK() - find by primary key
  Posts.findByPk(id)
    .then(data => {
      console.log(data.dataValues)
      return res.json({data:data.dataValues})
    })
    .catch((err) => {
      console.log("post can not loaded")
    })
})

router.post("/", validateToken, async (req, res) => {
  const post = req.body
  post.username = req.user.username
  post.UserId = req.user.id
  await Posts.create(post)
  return res.json(post)
})

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId
  await Posts.destroy({
    where: {
      id: postId,
    }
  })
  res.json("POST DELETED")
})

// specific user posts
router.get("/byUserId/:id", validateToken, async (req, res) => {
  const id = req.params.id
  // dasrulebis shemdeg gadasakvani iqneba userId-ze
  // const username = req.user.username
  Posts.findAll({
    where: {UserId: id},
    include: [Likes]
  })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      console.log(err)
    })
})
// update post
router.patch("/update-title", validateToken, async (req, res) => {
  const {id, newTitle} = req.body
  Posts.update({title: newTitle}, {where: {id: id}})
  .then(() => {
    res.json("SUCCESSFULLY UPDATED")
  })
  .catch (err => {
    console.log(err)
  })
})
router.patch("/update-text", validateToken, async (req, res) => {
  const {id, newText} = req.body
  Posts.update({title: newText}, {where: {id: id}})
    .then(() => {
      res.json("SUCCESSFULLY UPDATED")
    })
    .catch (err => {
      console.log(err)
    })
})

module.exports = router
