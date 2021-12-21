
module.exports = (sequilaze, DataTypes) => {
  const Posts = sequilaze.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  Posts.associate = (models) => {  // comentarebshi gansazgvravs postId-ebs
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",  // tu posts tsavshli tsaishleba misi kvela komentari
    })
    Posts.hasMany(models.Likes, {
      onDelete: "cascade"
    })
  }

  return Posts
}

