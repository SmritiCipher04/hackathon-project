const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    provider: { type: String, enum: ['google', 'phone'], required: true },
    fcmToken: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
