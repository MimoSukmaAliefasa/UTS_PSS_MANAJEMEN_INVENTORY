'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Suppliers, { foreignKey: 'created_by' });
      Admin.hasMany(models.Items, { foreignKey: 'created_by' });
      Admin.hasMany(models.Categories, { foreignKey: 'created_by' });
    }
  }
  Admin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};