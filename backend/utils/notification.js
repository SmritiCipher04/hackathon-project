const admin = require('../config/firebase');

exports.sendPushNotification = async (fcmToken, title, body, data = {}) => {
    const message = {
        notification: { title, body },
        token: fcmToken,
        data: { ...data, click_action: 'FLUTTER_NOTIFICATION_CLICK' }
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        return response;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
