import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

// export interface Document {
//   email: string;
//   password: string;
// }

export interface UserModel extends mongoose.Model<Document> {
  login(email: string, password: string): Document;
}

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    // validate: [(val) => emailRegex.test(val), 'Please enter a valid email'],
    match: [emailRegex, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
};

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User: UserModel = mongoose.model<Document, UserModel>(
  'user',
  userSchema,
);
