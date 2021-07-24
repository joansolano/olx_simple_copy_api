import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: String,
    birthday: Date,
    sex: String,
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    products: [
        {
            ref: 'Product',
            type: Schema.Types.ObjectId
        }
    ]
},{
    timestamps: true,
    versionKey: false
})

// Static functions
// Encrypt Password
userSchema.statics.encryptPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

// Compare Passwords
userSchema.statics.comparePassword = async (actualPassword, savedPassword) => {
    return await bcrypt.compare(actualPassword, savedPassword);
}

export default model('User', userSchema);