import mongoose from 'mongoose';
import paginator from 'mongoose-paginator-v2';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: String,
                required: true,
            },
            quantity: Number,
        },
    ],
}, { timestamp: true });

cartSchema.plugin(paginator);

export default mongoose.model('Cart', cartSchema);