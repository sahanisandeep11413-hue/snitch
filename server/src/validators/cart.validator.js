import {body, validationResult} from "express-validator";

export const addToCartValidator = [
    body("productId")
    .exists().withMessage("product id is required").bail()
     .isString().withMessage("product id must be a string").bail()
    .isMongoId().withMessage("product is must be a valid mongo id"),

    body("quantity")
    .exists().withMessage("quantity is required")
    .isInt({min:1}).withMessage("quantity must be an integer greater then 0"),

    body("size")
    .exists().withMessage("size is required").bail()
    .isString().withMessage("size must be a string").bail()
    .isIn(["XS","S","M","L","XL","XXL"]).withMessage("sizemust be one of xs, s, m, l ,xl, xxl"),

    (req,res,next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "validation failed",
                errors: errors.array()
            })
        }
    }
   


]