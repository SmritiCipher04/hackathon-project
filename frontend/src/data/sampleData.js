// ── Demo Users ─────────────────────────────────────────────────────────────
export const sampleUsers = [
  {
    id: "user-farmer-001",
    name: "Rajesh Kumar",
    phone: "9876543210",
    role: "farmer",
    language: "hi",
    location: "Shillong, Meghalaya",
    createdAt: new Date("2025-01-10"),
    rating: 4.7,
    ratingCount: 23,
  },
  {
    id: "user-farmer-002",
    name: "Lalremsiami Zote",
    phone: "9012345678",
    role: "farmer",
    language: "mizo",
    location: "Aizawl, Mizoram",
    createdAt: new Date("2025-02-05"),
    rating: 4.5,
    ratingCount: 18,
  },
  {
    id: "user-farmer-003",
    name: "Bah Kynmaw",
    phone: "9345678901",
    role: "farmer",
    language: "khasi",
    location: "Cherrapunji, Meghalaya",
    createdAt: new Date("2025-01-20"),
    rating: 4.8,
    ratingCount: 31,
  },
  {
    id: "user-farmer-004",
    name: "Gurpreet Singh",
    phone: "9765432109",
    role: "farmer",
    language: "en",
    location: "Amritsar, Punjab",
    createdAt: new Date("2025-01-15"),
    rating: 4.6,
    ratingCount: 45,
  },
  {
    id: "user-farmer-005",
    name: "Suresh Patel",
    phone: "9654321098",
    role: "farmer",
    language: "hi",
    location: "Lucknow, Uttar Pradesh",
    createdAt: new Date("2025-02-01"),
    rating: 4.3,
    ratingCount: 12,
  },
  {
    id: "user-buyer-001",
    name: "Priya Singh",
    phone: "9123456789",
    role: "buyer",
    language: "hi",
    location: "Delhi",
    createdAt: new Date("2025-01-12"),
    rating: 4.9,
    ratingCount: 8,
  },
  {
    id: "user-admin-001",
    name: "Admin User",
    phone: "9000000000",
    role: "admin",
    language: "en",
    location: "Mumbai, Maharashtra",
    createdAt: new Date("2024-12-01"),
    rating: 5,
    ratingCount: 0,
  },
];

// ── Demo farmer / buyer / admin shortcuts ─────────────────────────────────
export const demoFarmer = sampleUsers[0];
export const demoBuyer = sampleUsers[5];
export const demoAdmin = sampleUsers[6];

// ── Sample Products ────────────────────────────────────────────────────────
export const sampleProducts = [
  {
    id: "prod-001",
    farmerId: "user-farmer-001",
    farmerName: "Rajesh Kumar",
    cropName: "Organic Ginger",
    price: 120,
    quantity: "200 kg",
    location: "Shillong, Meghalaya",
    imageUrl: "/assets/generated/crop-ginger.dim_400x300.jpg",
    description:
      "Freshly harvested organic ginger from the hills of Meghalaya.",
    status: "active",
    createdAt: new Date("2026-02-25"),
  },
  {
    id: "prod-002",
    farmerId: "user-farmer-002",
    farmerName: "Lalremsiami Zote",
    cropName: "Mizoram Turmeric",
    price: 95,
    quantity: "150 kg",
    location: "Aizawl, Mizoram",
    imageUrl: "/assets/generated/crop-turmeric.dim_400x300.jpg",
    description:
      "High-curcumin turmeric grown in the pristine hills of Mizoram.",
    status: "active",
    createdAt: new Date("2026-02-24"),
  },
  {
    id: "prod-003",
    farmerId: "user-farmer-004",
    farmerName: "Gurpreet Singh",
    cropName: "Punjab Basmati Rice",
    price: 75,
    quantity: "500 kg",
    location: "Amritsar, Punjab",
    imageUrl: "/assets/generated/crop-rice.dim_400x300.jpg",
    description: "Premium long-grain basmati rice from Punjab.",
    status: "active",
    createdAt: new Date("2026-02-23"),
  },
];

// ── Sample Interests ───────────────────────────────────────────────────────
export const sampleInterests = [
  {
    id: "int-001",
    buyerId: "user-buyer-001",
    buyerName: "Priya Singh",
    buyerPhone: "9123456789",
    productId: "prod-001",
    productName: "Organic Ginger",
    farmerId: "user-farmer-001",
    status: "contacted",
    message: "I am interested in buying 50 kg of your ginger.",
    createdAt: new Date("2026-02-27"),
  },
];

// ── Sample Notifications ───────────────────────────────────────────────────
export const sampleNotifications = [
  {
    id: "notif-001",
    userId: "user-farmer-001",
    message: "Priya Singh is interested in your Organic Ginger listing!",
    notifType: "interest",
    readStatus: false,
    createdAt: new Date("2026-02-27T10:30:00"),
  },
];
