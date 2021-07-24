import mongoose from 'mongoose';
import config from './config';

(async () => {
    await mongoose.connect(config.mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(db => console.log('DB is connected')).catch(error => console.log(error))
})();