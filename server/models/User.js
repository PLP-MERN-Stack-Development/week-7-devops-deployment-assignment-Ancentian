const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true,
        unique: true,
        maxlength: [50, 'Username cannot be more than 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        minlength: [6, 'Password must be at least 6 characters'],
    },
    avatar: {
        type: String,
        default: 'default-avatar.jpg',
    },
    role: {
        type: String,
        enum: ["developer", "admin"], default: "developer"
    }
  }, { timestamps: true });

  module.exports = mongoose.model('User', UserSchema);

  