require('dotenv').config(); 
const express = require('express');
const { Op, sequelize } = require('../models')
const { Items, Categories, Suppliers, Admin } = require('../models')
const jwt = require('jsonwebtoken')
class Controller{
    //login admin
    static login(req, res){
        const SECRET_KEY = process.env.SECRET_KEY
        
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
          }
        Admin.findOne({ where: { username } })
        .then(admin => {
            if (!admin) {
                return res.status(401).json({ error: 'User not found' });
            }
            const payload = { id: admin.id, username: admin.username };
            const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
            return res.status(200).json({
                message: 'Login successful', token
            })
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to fetch admin', message: err.message})
        })
    }
    static home(req, res){
        res.redirect('/items')
    }
    
    // create items
    static createItems(req, res){
        const { name, description, price, quantity, category_id, supplier_id } = req.body
        const created_by = req.user.id
        Items.create({ name, description, price, quantity, category_id, supplier_id, created_by })
        .then(item => {
            return res.status(201).json(item)
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to create item', message: err.message})
        })
    }

    // read items
    static readItems(req, res){
        Items.findAll()
        .then(items => {
            return res.status(200).json(items)
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to fetch items', message: err.message})
        })  
    }

    // create category
    static createCategory(req, res){
        const { name, description } = req.body
        const created_by = req.user.id
        Categories.create({ name, description, created_by})
        .then(category => {
            return res.status(201).json(category)
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to create category', message: err.message})
        })
    }

    // read category
    static readCategory(req, res){
        Categories.findAll()
        .then(categories => {
            return res.status(200).json(categories)
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to fetch categories', message: err.message})
        })
    }

    // create supplier
    static createSupplier(req, res){
        const { name, contact_info } = req.body
        const created_by = req.user.id
        Suppliers.create({ name, contact_info, created_by })
        .then(supplier => {
            return res.status(201).json(supplier)
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to create supplier', message: err.message}) 
        })
    }

    // read supplier
    static readSupplier(req, res){
        Suppliers.findAll()
        .then(suppliers => {
            return res.status(200).json(suppliers)
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to fetch suppliers', message: err.message})
        })
    }

    // Show summary of item stocks including total stok, total nilai stok, and rata rata harga barang
    static itemSummary(req, res){
        Items.findAll()
        .then(items => {
            if(!items.length){
                return res.status(404).json({error: 'No items found'})
            }
            const totalStok = items.reduce((acc, item) => acc + item.quantity, 0)
            const totalNilaiStok = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
            const rataRataHargaBarang   = totalNilaiStok / totalStok
            return res.status(200).json({
                totalStok,
                totalNilaiStok,
                rata_harga_barang: Math.round(rataRataHargaBarang)
            })
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to count total summary', message: err.message})
        })
    }

    // show item when the stock is less than 5 items
    static lowStockItems(req, res){
        Items.findAll({
            where: {
                quantity: {
                    [Op.lt]: 5
                }
            }   
        })
        .then(items => {
            if(!items.length){
                return res.status(404).json({error: 'No items found'})
            }
            return res.status(200).json({
                message: `There are ${items.length} items with stock less than 5 items`,	
                data: items
            })
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to fetch low stock items', message: err.message})
        })
    }

    // show summary of categories
    static categorySummary(req, res){
        Categories.findAll({
            attributes: [
                'id',
                'name', 
                [sequelize.fn('COUNT', sequelize.col('Items.id')), 'totalItems'],
                [sequelize.literal('SUM("Items"."price" * "Items"."quantity")'), 'totalStockValue'],
                [sequelize.fn('AVG', sequelize.col('Items.price')), 'averagePrice']
            ],
            include: [
                {
                    model: Items,
                    attributes: []
                }
            ],
            group: ['Categories.id', 'Categories.name']
        })
        .then(categories => {
            if(!categories.length){
                return res.status(404).json({error: 'No categories found'})
            }
            const formatted = categories.map(category => {
                const totalStockValue = category.dataValues.totalStockValue
                ? parseFloat(category.dataValues.totalStockValue).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                : 'Rp0';

                const averagePrice = category.dataValues.averagePrice
                ? parseFloat(category.dataValues.averagePrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                : 'Rp0';
                return {
                    name: category.name,
                    total_items: parseInt(category.dataValues.totalItems),
                    totalStockValue,
                    averagePrice
                }
            })
            return res.status(200).json({
                message: `There are ${categories.length} categories`,	
                data: formatted
            })
        })
        .catch(err => {
            return res.status(500).json({error: 'Failed to fetch category summary', message: err.message})
        })
    }

    // show summary of suppliers
    static supplierSummary(req, res){
        Suppliers.findAll({
            attributes: [
              'id',
              'name',
              [sequelize.fn('COUNT', sequelize.col('Items.id')), 'totalItems'],
              [sequelize.fn('SUM', sequelize.literal('"Items"."price" * "Items"."quantity"')), 'totalValue']
            ],
            include: [{
              model: Items,
              attributes: []
            }],
            group: ['Suppliers.id']
          })
          .then(summary => {
            const formatted = summary.map(supplier => {
              const data = supplier.toJSON();
              return {
                name: data.name,
                totalItems: Number(data.totalItems),
                totalValue: `Rp${Number(data.totalValue || 0).toLocaleString('id-ID')}`
              };
            });
            return res.status(200).json({
                 message: `There are Supplier stock summary retrieved successfully`,
                 data : formatted
            });
          })
          .catch(err => {
            return res.status(500).json({ error: 'Failed to fetch supplier summary', message: err.message });
          });
    }

    // show all summary
    static allSummary(req, res){
        Promise.all([
            Items.count(),
            Items.findAll({ attributes: ['price', 'quantity'] }),
            Categories.count(),
            Suppliers.count()
          ])
          .then(([totalItems, items, totalCategories, totalSuppliers]) => {
            const totalStockValue = items.reduce((acc, item) => {
              return acc + (item.price * item.quantity);
            }, 0);
        
            return res.status(200).json({
              message: 'System summary retrieved successfully',
              data: {
                total_items: totalItems,
                total_stock_value: `Rp${totalStockValue.toLocaleString('id-ID')}`,
                total_categories: totalCategories,
                total_suppliers: totalSuppliers
              }
            });
          })
          .catch(err => {
            return res.status(500).json({ error: 'Failed to fetch system summary', message: err.message });
          });
    }
}

module.exports = Controller