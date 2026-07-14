// Run once with `npm run seed` to create the initial admin account.
// Reads credentials from environment variables so nothing sensitive is
// hard-coded in the repo. Safe to re-run: it won't duplicate the admin.
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seed() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, MONGO_URI } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      await existing.save();
      console.log(`Existing account for ${ADMIN_EMAIL} was not an admin — promoted to admin.`);
    } else {
      console.log(`Admin account already exists for ${ADMIN_EMAIL} and is already role "admin".`);
    }
  } else {
    await User.create({
      name: ADMIN_NAME || 'Clinic Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
    });
    console.log(`Admin account created for ${ADMIN_EMAIL}`);
  }

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});