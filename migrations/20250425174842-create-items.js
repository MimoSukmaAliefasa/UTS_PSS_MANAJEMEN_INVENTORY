'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: 'Categories',
            key: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: 'Suppliers',
            key: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull:  false,
        references: {
          model: 'Admins',
          key: 'id'          
        },        
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Items');
  }
};