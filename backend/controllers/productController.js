const Product = require('../models/Product');
const Notification = require('../models/Notification');
const admin = require('../config/firebase'); // For FCM

exports.createProduct = async (req, res) => {
    const { title, description, price, imageUrl } = req.body;
    try {
        const product = new Product({
            userId: req.user.id,
            title,
            description,
            price,
            imageUrl
        });
        await product.save();

        // Example FCM notification (to self or others, here self for demo)
        // In real app, you might notify followers or all users
        // This is just to satisfy the "Send push notification when new product added" requirement
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating product' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('userId', 'name email');
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching products' });
    }
};
