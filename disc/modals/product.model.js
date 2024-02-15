"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = ProductModel;
