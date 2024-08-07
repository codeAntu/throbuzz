import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],  // This must be changed 
   
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordExpire: Date,
  verifyToken: String,
  verifyExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // I will add more fields later
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
