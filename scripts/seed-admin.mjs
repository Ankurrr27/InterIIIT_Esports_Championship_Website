/**
 * One-time script to seed an admin user.
 * 
 * Usage:  node scripts/seed-admin.mjs
 * 
 * ⚠️  Edit the ADMIN details below before running.
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";

// ============================================
// ⬇️  EDIT THESE VALUES BEFORE RUNNING  ⬇️
// ============================================
const ADMIN_NAME     = "Admin";
const ADMIN_EMAIL    = "admin@iecesports.com";        // personal email
const ADMIN_COLLEGE_EMAIL = "admin@iiitkota.ac.in";   // must be a recognised college domain
const ADMIN_PASSWORD = "Admin@123";                   // change this!
const ADMIN_COLLEGE  = "IIIT Kota";
const ADMIN_GAME     = "BGMI";                        // BGMI | VALORANT | FREEFIRE
// ============================================

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error("❌  MONGODB_URI not found. Make sure .env.local exists.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅  Connected to MongoDB");

  // Use the raw collection so we don't need to import the model
  const usersCol = mongoose.connection.collection("users");

  // Check if admin already exists
  const existing = await usersCol.findOne({ collegeEmail: ADMIN_COLLEGE_EMAIL });
  if (existing) {
    if (existing.role === "ADMIN") {
      console.log("ℹ️  Admin user already exists with this college email. Nothing to do.");
    } else {
      // Upgrade existing user to admin
      await usersCol.updateOne(
        { _id: existing._id },
        { $set: { role: "ADMIN" } }
      );
      console.log(`✅  Upgraded existing user "${existing.name}" to ADMIN role.`);
    }
    await mongoose.disconnect();
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await usersCol.insertOne({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    collegeEmail: ADMIN_COLLEGE_EMAIL,
    password: hashedPassword,
    college: ADMIN_COLLEGE,
    game: ADMIN_GAME,
    role: "ADMIN",
    teamId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("✅  Admin user created successfully!");
  console.log("");
  console.log("   Login credentials:");
  console.log(`   Email:    ${ADMIN_COLLEGE_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log("");
  console.log("   Go to /admin to login.");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
