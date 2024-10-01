import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_SERVER).then(
    () => console.log('Connect to MongoDB successfully!'),
    err => console.log('Connect failed: ', err)
  );
}

export default connectDatabase;