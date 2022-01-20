import mongoose, { ConnectOptions } from 'mongoose';

let count = 0;

// TODO: вынести это в отдельные переменные окружения
const options: ConnectOptions = {
    pass: 'secret',
    user: 'mongoadmin',
};

const MONGO_URL = process.env.MONGO_HOST || 'localhost';

const connectWithRetry = () => {
    console.log('MongoDB connection with retry');

    mongoose.connect(`mongodb://${MONGO_URL}`, options).then(() => {
        console.log('MongoDB is connected');
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000);
    })
};

connectWithRetry();

export default mongoose;
