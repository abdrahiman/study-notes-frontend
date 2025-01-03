import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

// Define the User Schema
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"] },
    phoneNumber: { type: String, default: "" },
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
  },
  { timestamps: true }
);

// Pre-save middleware to hash passwords
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to remove sensitive data from the JSON response
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.verificationToken;
  delete user.verificationTokenExpiresAt;
  delete user.__v;
  return user;
};

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = models.User || model("User", userSchema);

export default User;
