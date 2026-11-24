import {body, param, validationResult} from "express-validator";

export const createProductValidator = [
    body("title")
    .exists().withMessage("title is required").bail()
    .isString().withMessage("title must be String").bail()
    .trim()
    .isLength({min:2, max:100}).withMessage("title Length must be between 2 to 100 charecters").bail()
    .isAlpha("en-US", {ignore: " -"}).withMessage("title can only have english small case and capital case characters").bail(),
    body("description")
    .exists().withMessage("description is required").bail()
    .isString().withMessage("description must be a string").bail()
    .trim()
    .isLength({min:20, max:500}).withMessage("description length must be 20 t 500 charecters").bail(),

    body("price.amount")
    .exists().withMessage("price is required").bail()
    .isFloat({min:0}).withMessage("price must be a floating number and greater than 0").bail(),
   
    body("price.currency")
    .exists().withMessage("currency is required").bail()
    .isString().withMessage("currency must be a string").bail()
     .isIn(["INR", "USD"]).withMessage("currency either be INR or USD").bail(),

     body("sizes")
     .exists().withMessage("sizes is required").bail()
     .isArray({min:1}).withMessage("sizes must be an array with at least one element").bail()
     .custom((sizes) => {
         const validSizes = ["XS", "S", "M", "L", "XL"];
         const invalidSizes = sizes.filter((size) => !validSizes.includes(size));
         if (invalidSizes.length > 0) {
             throw new Error(`Invalid sizes. Valid options are: ${validSizes.join(", ")}`);
         }
         return true;
     }),
     body("sizes.*.stock")
     .exists().withMessage("stock must be present in every entry of the sizes array").bail()
     .isInt({min: 0}).withMessage("stock must be a integer value ").bail(),

     (req,res, next) =>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "invalid request",
                 errors: errors.array() 
                });
        }
        next();
     }
     
]

export const unlistProductValidator = [
    param("id")
    .exists().withMessage("product id is required in req params").bail()
    .isMongoId().withMessage("product id must b a valid mongo id"),
   
    (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "invalid data",
                errors: errors.array()
            })
        }next()
    }

]