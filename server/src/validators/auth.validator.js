import {body, validationResult } from "express-validator";

export const registerValidator = [
    body('email')
    .exists().withMessage("emal is required").bail()
    .trim()
    .isEmail().withMessage("enter valid email address"),
    body("name")
    .exists().withMessage("name is required").bail()
    .isString().withMessage("name must be string")
    .trim()
    .isLength({min: 2, max:50}).withMessage("name length must bebetween 2 to 50 charecter"),
     body("password")
    .exists().withMessage("password is required").bail()
    .isString().withMessage("password must be a String")
    .trim()
    .isLength({min:6 }).withMessage("password at least 6 charecter"),
    
    (req, res , next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid request",
                errors: errors.array()
            })
        }
        next()
    }

]

//req me jo bhi checks fail hote hai vo aata hai toh uskonikalne ke liye hum
//(re,res, next) jo hai vo likhte hai

export const loginValidator = [
    body("email")
    .exists().withMessage("email is required").bail()
    .isString().withMessage("email must be string").bail()
    .trim()
    .isEmail().withMessage("enter a vlid email address").bail(),
    body("password")
    .exists().withMessage("password is required").bail()
    .isString().withMessage("password must be a String").bail()
    .trim()
    .isLength({min:6}).withMessage("password must be 6 charecter long"),
    (req,res,next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid request",
                errors: errors.array()
            })
        }
        next()
    }

]