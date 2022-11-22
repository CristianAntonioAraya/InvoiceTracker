import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const { DEV_URI, PROD_URI, NODE_ENV } = process.env;

const URI = NODE_ENV === 'development' ? DEV_URI : PROD_URI;

mongoose.connect(URI);


mongoose.connection.once('open', () => {
    console.log(`Database connecting in ${NODE_ENV} mode`);
});

export default mongoose;
