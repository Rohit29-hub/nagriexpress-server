import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const ProductModel = model('Product', productSchema);
export default ProductModel;
