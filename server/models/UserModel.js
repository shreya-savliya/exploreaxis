import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  dob: {
    type: Date,
  },
  profileImage: {
    type: String, // URL of the uploaded profile image
  },
  coverImage: {
    type: String, // URL of the uploaded cover image
  },
});

const User = mongoose.model("User", userSchema);
export default User;
