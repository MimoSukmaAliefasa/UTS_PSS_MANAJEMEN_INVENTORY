const express = require ('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const auth = require('../middleware/auth')

router.post ('/login', Controller.login)
router.get ('/', auth, Controller.home)
router.post ('/create-items', auth, Controller.createItems)
router.get ('/items', auth, Controller.readItems)
router.post ('/create-category', auth, Controller.createCategory)
router.get ('/category', auth, Controller.readCategory)
router.post ('/create-supplier', auth, Controller.createSupplier)
router.get ('/supplier', auth, Controller.readSupplier)
router.get ('/item-summary', auth, Controller.itemSummary)
router.get ('/low-stock-items', auth, Controller.lowStockItems)
router.get ('/category-summary', auth, Controller.categorySummary)
router.get ('/supplier-summary', auth, Controller.supplierSummary)
router.get ('/all-summary', auth, Controller.allSummary)


module.exports = router


