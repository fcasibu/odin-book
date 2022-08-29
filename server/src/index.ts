import mongoose from 'mongoose';
import app from './app';

mongoose
  .connect(process.env.MONGODB as string)
  .then(() => console.log('Connected to MONGODB'));

const db = mongoose.connection;

db.on('error', () => console.error('Failed connecting to MONGODB'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
