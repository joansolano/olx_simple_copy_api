import { Router } from "express";
import * as userCtrl from '../controllers/users.controller';

const router = Router();

// ROUTES
// Sign In
router.post('/signin', userCtrl.signIn);

// Sign Up
router.post('/signup', userCtrl.signUp);

// User products
router.get('/:userId/products', userCtrl.productsByUser);

// Get user
router.get('/:userId', userCtrl.getUser);

// Test Routes
router.get('/', userCtrl.getUsers);

export default router;