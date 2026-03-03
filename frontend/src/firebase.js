import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const messaging = (() => {
  try {
    return getMessaging(app);
  } catch (error) {
    console.warn("Firebase Messaging not available:", error);
    return null;
  }
})();

export const requestForToken = async () => {
  if (!messaging) {
    console.warn("Messaging not initialized");
    return null;
  }

  try {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY || "YOUR_VAPID_KEY",
    });
    if (currentToken) {
      console.log("FE FCM Token:", currentToken);
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one.",
      );
      return null;
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) {
      resolve({ notification: null });
      return;
    }
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

// Request notification permission and get token
export const initializeNotifications = async () => {
  if (!messaging) {
    console.warn("Firebase Messaging not available");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await requestForToken();
      return token;
    } else {
      console.log("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return null;
  }
};
