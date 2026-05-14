require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 MongoDB Conectado"))
    .catch(err => console.error(err));

// Rotas
app.use('/api/auth', authRoutes);

// Produtos
//app.get('/api/products', async (req, res) => {
    //const products = await Product.find();
    //res.json(products);
//});

// No seu server.js
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar produtos" });
    }
});

app.post('/api/products', authMiddleware, async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Removido" });
});

// Pedidos e Socket
app.post('/api/orders', async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    io.emit('newOrder', newOrder); 
    res.status(201).json(newOrder);
});

const PORT = process.env.PORT || 3001;
console.log(`http://localhost:3001/`);
server.listen(PORT, () => console.log(`🚀 Servidor na porta ${PORT}`));
