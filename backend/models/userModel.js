const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        // Password is only required for local authentication
        return !this.googleId;
      },
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Prevents password field from returning in standard queries
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents to have missing (null/undefined) googleId
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Hashes the user password using bcryptjs before saving to MongoDB
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method: Compares entered plain-text password with hashed password stored in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;