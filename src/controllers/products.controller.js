import Product from '../models/Product';
import User from '../models/User';

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
}

export const createProduct = async (req, res) => {
    const {name, description, category, price, imgURL} = req.body
    const userId = req.headers['x-user-id']
    const newProduct = new Product({
        name, 
        description, 
        category, 
        price, 
        imgURL
    })
    const savedProduct = await newProduct.save()
    const userById = await User.findById(userId)
    userById.products.push(savedProduct)
    await userById.save()
    res.status(201).json(savedProduct)
}

export const getProductByID = async (req, res) => {
    const product = await Product.findById(req.params.productID)
    res.status(200).json(product)
}

export const updateProductByID = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productID, 
        req.body, 
        {
            new: true
        }
    )
    res.status(200).json(updatedProduct)
}

export const deleteProductByID = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productID)
    res.status(204).json()
}

