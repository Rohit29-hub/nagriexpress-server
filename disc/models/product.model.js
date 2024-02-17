"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: [
        {
            type: String,
            required: true
        }
    ],
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    images: [{
            type: String,
            required: true
        }],
    stock: {
        type: Number,
        required: true
    },
    ratings: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
            username: { type: String },
            rating: { type: Number },
            comment: { type: String }
        }],
    tags: [{
            type: String
        }],
    shipping_info: {
        weight: { type: String },
        dimensions: { type: String },
        shipping_cost: { type: Number },
        estimated_delivery: { type: String }
    },
    material: {
        type: String
    },
    care_instructions: {
        type: String
    },
    country_of_origin: {
        type: String
    },
    model_info: {
        height: { type: String },
        size_worn: { type: String }
    }
});
exports.default = (0, mongoose_1.model)('Product', productSchema);
