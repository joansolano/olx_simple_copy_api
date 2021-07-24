import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signIn = async (req, res) => {
    const userFound = await User.findOne({
        email: req.body.email
    })
    if (!userFound) return res.status(404).json({
        message: 'User not found'
    })
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    if (!matchPassword) return res.status(401).json({
        message: 'Incorrect password'
    })
    const token = jwt.sign(
        {id: userFound._id},
        config.secretToken,
        {
            expiresIn: 60 // 1 minuto
        }
    )
    res.status(200).json({token})
}

export const signUp = async (req, res) => {
    const {
        name,
        birthday,
        sex,
        username,
        email,
        password
    } = req.body
    const newUser = new User({
        name,
        birthday: new Date(birthday),
        sex,
        username,
        email,
        password: await User.encryptPassword(password)
    })
    const savedUser = await newUser.save()
    console.log(savedUser);
    const token = jwt.sign(
        {id: savedUser._id},
        config.secretToken,
        {
            expiresIn: 60 // 1 minuto
        }
    )
    res.status(201).json({token})
}

export const getUser = async (req, res) => {
    const userId = req.params.userId
    const userFound = await User.findById(userId)
    res.status(200).json(userFound)
}

export const productsByUser = async (req, res) => {
    const userId = req.params.userId // req.headers['x-user-id']
    const userFound = await User.findById(userId).populate('products')
    res.status(200).json(userFound.products)
}

// Test Routes
export const getUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
}