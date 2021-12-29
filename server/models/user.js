"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.user.hasMany(models.bookmark, {foreignKey:"user_id", sourceKey:"id"})
            models.user.hasMany(models.post, {foreignKey:"user_id", sourceKey:"id"})
        }
    }
    user.init(
        {
            user_id: DataTypes.STRING,
            password: DataTypes.STRING,
            nickName: DataTypes.STRING,
            gender: DataTypes.INTEGER,
            location: DataTypes.STRING,
            user_Photo: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "user",
        }
    )
    return user
}
