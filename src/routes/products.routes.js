import { Router } from "express"
import * as productsCtrl from '../controllers/products.controller'
import { verifyToken } from "../middlewares/verifySession"

const router = Router()

// ROUTES
// Get all products
router.get('/', productsCtrl.getProducts)

// Create a one product
router.post('/', verifyToken, productsCtrl.createProduct)

// Get one product
router.get('/:productID', productsCtrl.getProductByID)

// Update one product
router.put('/:productID', verifyToken, productsCtrl.updateProductByID)

// Delete one product
router.delete('/:productID', verifyToken, productsCtrl.deleteProductByID)

export default router;