'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Suppliers.belongsTo(models.Admin, { foreignKey: 'created_by' });
      Suppliers.hasMany(models.Items, { foreignKey: 'supplier_id' });
    }
  }
  Suppliers.init({
    name: DataTypes.STRING,
    contact_info: DataTypes.STRING,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Suppliers',
  });
  return Suppliers;
};