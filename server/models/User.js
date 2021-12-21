
module.exports = (sequilaze, DataTypes) => {
  const Users = sequilaze.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })

  Users.associate = (models) => {  // comentarebshi gansazgvravs postId-ebs
    Users.hasMany(models.Posts, {
      onDelete: "cascade",  // tu posts tsavshli tsaishleba misi kvela komentari
    })
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    })
  }

  return Users
}
