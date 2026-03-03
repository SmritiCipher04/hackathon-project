const User = require('../models/User');
const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');

exports.firebaseLogin = async (req, res) => {
    const { idToken } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name, picture, phone_number, firebase } = decodedToken;
        const provider = firebase.sign_in_provider === 'phone' ? 'phone' : 'google';

        let user = await User.findOne({ email: email || '' });
        if (!user && phone_number) {
            user = await User.findOne({ phone: phone_number });
        }

        if (!user) {
            user = new User({
                name: name || 'User',
                email: email || `${decodedToken.uid}@firebase.com`,
                phone: phone_number || '',
                provider,
                role: 'user'
            });
            await user.save();
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Firebase Login Error:', error);
        res.status(401).json({ success: false, message: 'Invalid Firebase token' });
    }
};
