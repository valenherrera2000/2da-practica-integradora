import mongoose from 'mongoose';

export const init = async () => {
  try {
    const URI = 'mongodb+srv://vherrera010:Jazmin1646!@cluster0.0bqs67z.mongodb.net/e-commerce';
    await mongoose.connect(URI);
    console.log('Database connected 🚀');
  } catch (error) {
    console.error('Error to connect to database', error.message);
  }
};
