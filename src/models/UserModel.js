import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: String, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }, // Fixed typo here
  role: { type: String, required: false, default: 'user' },
}, { timestamps: true }); 

userSchema.plugin(paginator);

export default mongoose.model('User', userSchema);
