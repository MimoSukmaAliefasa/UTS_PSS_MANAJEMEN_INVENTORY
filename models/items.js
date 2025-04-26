'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsTo(models.Categories, { foreignKey: 'category_id' });
      Items.belongsTo(models.Suppliers, { foreignKey: 'supplier_id' });
      Items.belongsTo(models.Admin, { foreignKey: 'created_by' });  
    }
  }
  Items.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    supplier_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};