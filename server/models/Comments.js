
module.exports = (sequilaze, DataTypes) => {
  const Comments = sequilaze.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // PostId gatserilia Post.js-shi
  })

  return Comments
}
