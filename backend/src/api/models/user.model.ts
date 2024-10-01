import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  tokenUser: String,    
  avatar: {
    type: String,
    default: ""
  },    
  status: {
    type: String,
    default: "active"
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
  }, {
    timestamps: true
});

const User = mongoose.model('User', userSchema, 'users');

export default User;