# Local Connect

A full-stack marketplace application that connects farmers directly with buyers, eliminating middlemen. Built with the MERN stack (MongoDB, Express, React, Node.js) and Firebase for authentication.

![Local Connect](https://img.shields.io/badge/Local-Connect-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square)

## 🌟 Features

### Authentication

- **Firebase Authentication** with multiple providers:
  - Google Sign-In (Popup)
  - Phone Number Authentication (OTP)
- **JWT Tokens** for API security with refresh tokens
- Multi-step registration flow with role selection (Farmer/Buyer)
- Demo accounts for testing

### User Roles

- **Farmer**: List products, manage inventory, receive notifications
- **Buyer**: Browse marketplace, search crops, contact farmers
- **Admin**: Full system access and dashboard

### Core Functionality

- 📦 Product listing with images, pricing, and descriptions
- 🔍 Search and filter products by various criteria
- 📱 Push notifications for new products and updates
- 🌍 Multi-language support (English, Hindi, Khasi, Mizo)
- 📶 Offline indicator for poor connectivity areas

### Tech Stack

#### Backend

| Technology         | Purpose              |
| ------------------ | -------------------- |
| Express.js         | REST API Framework   |
| MongoDB + Mongoose | Database & ODM       |
| Firebase Admin     | Authentication & FCM |
| JWT                | Token-based Auth     |
| Helmet             | Security Headers     |
| Express Rate Limit | API Rate Limiting    |

#### Frontend

| Technology      | Purpose           |
| --------------- | ----------------- |
| React 19        | UI Framework      |
| Vite            | Build Tool        |
| Tailwind CSS    | Styling           |
| Radix UI        | Component Library |
| Zustand         | State Management  |
| TanStack Query  | Data Fetching     |
| Firebase Client | Client Auth       |
| React Hook Form | Form Handling     |

## 📁 Project Structure

```
local-connect/
├── backend/
│   ├── config/
│   │   └── firebase.js         # Firebase Admin SDK config
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── productController.js # Product CRUD
│   │   └── userController.js   # User management
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   ├── Notification.js     # Notification schema
│   │   ├── Product.js         # Product schema
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth API routes
│   │   ├── productRoutes.js   # Product API routes
│   │   └── userRoutes.js      # User API routes
│   ├── utils/
│   │   └── notification.js    # FCM notification utilities
│   ├── firebase-admin-sdk.json
│   ├── package.json
│   └── server.js              # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx     # Navigation component
    │   │   └── ui/            # Radix UI components
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AuthPage.jsx   # Authentication page
    │   │   ├── BuyerDashboard.jsx
    │   │   ├── FarmerDashboard.jsx
    │   │   ├── MarketplacePage.jsx
    │   │   ├── NotificationsPage.jsx
    │   │   └── ProfilePage.jsx
    │   ├── stores/
    │   │   └── appStore.js    # Zustand store
    │   ├── hooks/
    │   │   ├── useTranslation.js
    │   │   └── use-mobile.jsx
    │   ├── firebase.js        # Firebase client config
    │   ├── utils/
    │   │   └── api.js         # API client
    │   ├── App.jsx            # Main app component
    │   └── main.jsx           # React entry point
    ├── env.json
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Firebase Project (for Auth & FCM)

### Backend Setup

1. Navigate to the backend directory:

```
bash
   cd backend

```

2. Install dependencies:

```
bash
   npm install

```

3. Create a `.env` file in the backend directory:

```
env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/local-connect
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_refresh_secret_key
   CORS_ORIGIN=http://localhost:5173

```

4. Set up Firebase Admin SDK:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Download the service account JSON
   - Rename it to `firebase-admin-sdk.json` in the backend folder

5. Start the backend server:

```
bash
   # Development (with nodemon)
   npm run dev

   # Production
   npm start

```

### Frontend Setup

1. Navigate to the frontend directory:

```
bash
   cd frontend

```

2. Install dependencies:

```
bash
   npm install

```

3. Configure environment:
   - Update `env.json` with your backend URL:

```
json
   {
     "backend_host": "http://localhost:5000"
   }

```

4. Start the development server:

```
bash
   npm run dev

```

5. Open http://localhost:5173 in your browser

## 📡 API Endpoints

### Authentication

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| POST   | `/api/auth/firebase-login` | Firebase token login |

### Users

| Method | Endpoint                    | Description    |
| ------ | --------------------------- | -------------- |
| POST   | `/api/users/save-fcm-token` | Save FCM token |

### Products

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | `/api/products` | Get all products               |
| POST   | `/api/products` | Create product (Auth required) |

## 🔐 Security Features

- JWT token-based authentication
- Firebase token verification
- Helmet for HTTP security headers
- CORS configuration
- Rate limiting (100 requests/15 min)
- Input validation with Joi

## 🎨 UI Components

The project uses Radix UI primitives with custom styling:

- Buttons, Inputs, Cards
- Dialogs, Dropdowns
- Navigation components
- Form elements
- Toast notifications (Sonner)
- And many more...

## 📱 Push Notifications

Firebase Cloud Messaging (FCM) is integrated for:

- New product alerts
- Order notifications
- System updates

## 🌐 Multi-Language Support

The app supports 4 languages:

- English (en)
- Hindi (hi)
- Khasi (khasi)
- Mizo (mizo)

Language can be selected during the authentication flow.

## 📄 License

ISC License

## 👏 Acknowledgments

Built with ❤️ team [system.in]
