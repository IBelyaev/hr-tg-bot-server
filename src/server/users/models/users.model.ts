import { Document } from 'mongoose';

import mongoose from '../../common/services/mongoose.service';

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

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

const DEFAULT_USER_FIELDS = {
    currentQuestion: 0,
    isPassedScreening: false,
    goals: 0,
    startDate: '',
    finishDate: '',
};

const UserModels = {
    createUser: (userData: Omit<UserDocument, 'currentQuestion' | 'isPassedScreening' | 'goals'>) => {
        const user = new UserModel({...userData, ...DEFAULT_USER_FIELDS});

        return user.save();
    },
    list: () => {
        return new Promise<UserDocument[]>((resolve, reject) => {
            UserModel.find()
                .exec((err, users) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(users);
                    }
                })
        });
    },
};

export default UserModels;
