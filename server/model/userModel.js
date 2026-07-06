import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpiry: { type: Date },
      token:{type:String,default:null},
    isOtpVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    resetPasswordAllowed: { type: Boolean, default: false },
isLoggedIn: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;