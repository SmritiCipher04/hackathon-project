const User = require('../models/User');

exports.saveFcmToken = async (req, res) => {
    const { fcmToken } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { fcmToken }, { new: true });
        res.json({ success: true, message: 'FCM token saved' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving FCM token' });
    }
};
