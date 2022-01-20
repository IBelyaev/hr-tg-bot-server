import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
    surname: string;
    name: string;
    currentQuestion: number;
    isPassedScreening: boolean;
    goals: number;
    startDate: string;
    finishDate: string;
};

export const UserSchema = new mongoose.Schema({
    surname: String,
    name: String,
    currentQuestion: Number,
    isPassedScreening: Boolean,
    goals: Number,
    startDate: String,
    finishDate: String,
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
