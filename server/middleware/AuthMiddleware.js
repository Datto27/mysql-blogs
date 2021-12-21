const {verify} = require("jsonwebtoken")


const validateToken = (req, res, next) => {
  // console.log("req header --> ", req.header("accessToken"))
  // Post.jsx-dan/frontend-dan gamogzavnili header
  const accessToken = req.header("accessToken")

  if (!accessToken) {
    return res.json({error: "User not loged in"})
  }
  try {
    const validToken = verify(accessToken, "imposterzxcola")
    // console.log("valid: ", validToken)
    req.user = validToken
    if (validToken) {
      return next()
    }
  } catch(err) {
    return res.json({error: err})
  }
}

module.exports = {validateToken}