"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.post.hasMany(models.bookmark, {foreignKey:"post_id", sourceKey:"id"})
            models.post.belongsTo(models.user, {foreignKey:"user_id", targetKey:"id"})
        }
    }
    post.init(
        {
            user_id: DataTypes.STRING,
            post_photo: DataTypes.STRING,
            post_title: DataTypes.STRING,
            post_content: DataTypes.STRING,
            weather: DataTypes.STRING,
            wind: DataTypes.STRING,
            temp: DataTypes.STRING,
            outer_id: DataTypes.STRING,
            top_id: DataTypes.STRING,
            bottom_id: DataTypes.STRING,
            xLocation: DataTypes.NUMERIC(20, 15),
            yLocation: DataTypes.NUMERIC(20, 15),
        },
        {
            sequelize,
            modelName: "post",
        }
    )
    return post
}
