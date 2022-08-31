import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  password: string;
  passwordConfirm?: string;
  active: boolean;
  avatarURL?: string;
  bannerURL?: string;
  odinTokens: number;
  createdAt: Date;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 12,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 12,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  bio: {
    type: String,
    minLength: 3,
    maxLength: 200,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  passwordConfirm: {
    type: String,
    minLength: 8,
  },
  avatarURL: String,
  bannerURL: String,
  odinTokens: {
    type: Number,
    default: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre(/^(findOneAndUpdate|save)/i, async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
