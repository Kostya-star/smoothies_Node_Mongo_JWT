import mongoose from "mongoose";
const { Schema } = mongoose

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [(val) => emailRegex.test(val), 'Please enter a valid email'],
    // trim: true,
    // match: [emailRegex, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password must be at least 6 characters'],
    // select: false
  }
})

export const User = mongoose.model('user', userSchema)