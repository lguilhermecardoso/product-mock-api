const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let products = [
    { id: 1, name: 'Product A', price: 100, imageUrl: 'https://picsum.photos/200/200?random=1' },
    { id: 2, name: 'Product B', price: 230, imageUrl: 'https://picsum.photos/200/200?random=2' },
    { id: 3, name: 'Product C', price: 323, imageUrl: 'https://picsum.photos/200/200?random=3' },
    { id: 4, name: 'Product D', price: 580, imageUrl: 'https://picsum.photos/200/200?random=4' },
    { id: 5, name: 'Product E', price: 10, imageUrl: 'https://picsum.photos/200/200?random=5' },
    { id: 6, name: 'Product F', price: 0.70, imageUrl: 'https://picsum.photos/200/200?random=6' },
    { id: 7, name: 'Product G', price: 99, imageUrl: 'https://picsum.photos/200/200?random=7' },
    { id: 8, name: 'Product H', price: 777, imageUrl: 'https://picsum.photos/200/200?random=8' },
    { id: 9, name: 'Product I', price: 900, imageUrl: 'https://picsum.photos/200/200?random=9' },
    { id: 10, name: 'Product J', price: 1000, imageUrl: 'https://picsum.photos/200/200?random=10' }
];

// List all products
app.get('/product', (req, res) => {
    res.json(products);
});

// Get a specific product by ID
app.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// Add a new product
app.post('/product', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        imageUrl: `https://picsum.photos/200/200?random=${products.length + 1}`
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update an existing product
app.put('/product/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl || product.imageUrl; // Update imageUrl if provided
    res.json(product);
});

// Delete a product
app.delete('/product/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    const index = products.indexOf(product);
    products.splice(index, 1);
    res.json(product);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
