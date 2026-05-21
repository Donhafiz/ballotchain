// Seed script: Create default admin user
// Run with: node scripts/seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ballotchain";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const UserSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: { type: String, unique: true },
      password: String,
      role: { type: String, default: "voter" },
      status: { type: String, default: "active" },
      verified: { type: Boolean, default: true },
    });

    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    const existingAdmin = await User.findOne({ email: "admin@ballotchain.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash("password123", 12);

    await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@ballotchain.com",
      password: hashedPassword,
      role: "super_admin",
      status: "active",
      verified: true,
    });

    console.log("✅ Admin user created!");
    console.log("   Email: admin@ballotchain.com");
    console.log("   Password: password123");
    
    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
