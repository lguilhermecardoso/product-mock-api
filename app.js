const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let products = [
    { id: 1, name: 'Product A', price: 100, imageUrl: 'https://picsum.photos/200/200?random=1' },
    { id: 2, name: 'Product B', price: 200, imageUrl: 'https://picsum.photos/200/200?random=2' },
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
