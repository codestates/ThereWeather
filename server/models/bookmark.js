'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.bookmark.belongsTo(models.user, {foreignKey:"user_id", targetKey:"id"})
      models.bookmark.belongsTo(models.post, {foreignKey:"post_id", targetKey:"id"})
    }
  };
  bookmark.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bookmark'
  });
  return bookmark;
};