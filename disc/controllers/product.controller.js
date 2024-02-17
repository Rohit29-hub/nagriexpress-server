"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.signleProduct = exports.allProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const ApiResponse_1 = require("../utils/ApiResponse");
const mongoose_1 = require("mongoose");
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find({});
        res.json(new ApiResponse_1.ApiResponse(200, "data fetch successfully.", {
            success: true,
            data: products
        }));
    }
    catch (err) {
        console.log(err.message);
        return res.status(409).json({
            message: err.message,
            success: false
        });
    }
});
exports.allProducts = allProducts;
const signleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, productName } = req.params;
    try {
        const product = yield product_model_1.default.findOne({
            $or: [{ _id: new mongoose_1.Types.ObjectId(productId) }, { title: productName }]
        });
        if (!product) {
            throw new Error("Product not found !");
        }
        res.json(new ApiResponse_1.ApiResponse(200, "Product fetch successfully.", {
            success: true,
            data: product
        }));
    }
    catch (err) {
        console.log(err.message);
        return res.status(409).json({
            message: err.message,
            success: false
        });
    }
});
exports.signleProduct = signleProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (let fields in req.body) {
            if (req.body[fields] == '') {
                throw new Error(`Please add this field. Because ${fields} is empty .`);
            }
        }
        const newProduct = yield new product_model_1.default({
            title: req.body.title,
            category: req.body.category,
            brand: req.body.brand,
            description: req.body.description,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price,
            discount: req.body.discount,
            images: req.body.images,
            stock: req.body.stock,
            ratings: req.body.ratings,
            reviews: req.body.reviews,
            tags: req.body.tags,
            shipping_info: req.body.shipping_info,
            material: req.body.material,
            care_instructions: req.body.care_instructions,
            country_of_origin: req.body.country_of_origin,
            model_info: req.body.model_info
        });
        yield newProduct.save();
        return res.json(new ApiResponse_1.ApiResponse(200, "product add successfully.", {
            productId: newProduct._id
        }));
    }
    catch (err) {
        console.log(err.message);
        return res.status(409).json({
            message: err.message,
            success: false
        });
    }
});
exports.addProduct = addProduct;