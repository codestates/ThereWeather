"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class emailauth extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.emailauth.hasMany(models.bookmark, {
                foreignKey: "user_id",
                sourceKey: "id",
            })
        }
    }
    emailauth.init(
        {
            temporary_id: DataTypes.STRING,
            email: DataTypes.STRING,
            code: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "emailauth",
        }
    )
    return emailauth
}
