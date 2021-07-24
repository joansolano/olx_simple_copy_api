import express from 'express';
import morgan from 'morgan';

import productsRoutes from './routes/products.routes';
import usersRoutes from './routes/users.routes';

// Instaciamiento de Express
const app = express();

// Server port
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev')); // HTTP Status Codes in terminal
app.use(express.json()); // Express understand JSON

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

export default app;