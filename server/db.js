import mongoose from 'mongoose';
import { initialMenuItems, initialReviews, initialReservations, initialOrders } from './seedData.js';

// In-memory persistent data store
export const store = {
  users: [
    {
      id: "admin-1",
      name: "Master Barista Admin",
      email: "admin@morningbrew.com",
      password: "admin", // in real app hashed, here supports demo fast login
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      phone: "+1 (555) 000-BREW"
    },
    {
      id: "cust-1",
      name: "Sarah Jenkins",
      email: "customer@morningbrew.com",
      password: "user",
      role: "customer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      phone: "+1 (555) 789-0123",
      loyaltyPoints: 340
    }
  ],
  menuItems: [...initialMenuItems],
  orders: [...initialOrders],
  reservations: [...initialReservations],
  reviews: [...initialReviews]
};

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/morning_brew_cafe';
  try {
    console.log(`[DB] Attempting connection to MongoDB at ${uri}...`);
    // Short timeout so startup isn't blocked if Mongo isn't running locally
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log(`[DB] Successfully connected to MongoDB.`);
    return true;
  } catch (err) {
    console.log(`[DB] Notice: MongoDB local server not active. Operating smoothly in Embedded Memory Database mode with pre-seeded data.`);
    return false;
  }
}
