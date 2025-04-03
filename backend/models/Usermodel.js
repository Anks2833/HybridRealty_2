import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpire: { type: Date },
    wishlist: {type: [mongoose.Schema.Types.ObjectId], ref: "Property"}
});

const User = mongoose.model('User', UserSchema);

export default User;