import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import { ApiResponse } from "../utils/ApiResponse";
import { Types } from "mongoose";

const allProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find({});

        res.json(new ApiResponse(200, "data fetch successfully.", {
            success: true,
            data: products
        }))

    } catch (err: any) {
        console.log(err.message);
        return res.status(409).json({
            message: err.message,
            success: false
        })
    }
}

const signleProduct = async (req: Request, res: Response) => {
    const { productId, productName } = req.params;

    try {
        const product = await ProductModel.findOne({ 
            $or: [{ _id: new Types.ObjectId(productId) }, { title: productName }] 
        })

        if (!product) {
            throw new Error("Product not found !");
        }

        res.json(
            new ApiResponse(200, "Product fetch successfully.", {
                success: true,
                data: product
            })
        )

    } catch (err: any) {
        console.log(err.message);
        return res.status(409).json({
            message: err.message,
            success: false
        })
    }
}

const addProduct = async (req: Request, res: Response) => {
    try{

        for(let fields in req.body){
            if(req.body[fields] == ''){
                throw new Error(`Please add this field. Because ${fields} is empty .`)
            }
        }

        const newProduct = await new ProductModel({
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
        })

        await newProduct.save();

        return res.json(
            new ApiResponse(200,"product add successfully.",{
                productId: newProduct._id
            })
        )

    }catch(err: any){
        console.log(err.message);
        return res.status(409).json({
            message: err.message,
            success: false
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const updateFields = {};
    
    try{
        const product = await ProductModel.findOneAndUpdate(
            {_id: productId},
            {$set: updateFields},
            {new : true}
        )

        if (!product) {
            throw new Error("Product not found !");
        }

        res.json(
            new ApiResponse(200,"update product successfully.",{
                id: product._id
            })
        )

    }catch(err: any){
        res.status(401).json({
            message: err.message,
            success: false
        })
    }
}

export {
    allProducts,
    signleProduct,
    addProduct,
    updateProduct
}