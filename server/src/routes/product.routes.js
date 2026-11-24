import {Router} from "express"
import {createProductValidator} from "../validators/product.validator.js";
import {authenticate} from "../middlewares/auth.middleware.js";
import {createProduct} from "../controller/product.controller.js";
import {listAllProducts} from "../controller/product.controller.js";
import { authenticateseller } from "../middlewares/auth.middleware.js";
import { unlistProductValidator } from "../validators/product.validator.js";
import { unlistProduct } from "../controller/product.controller.js";
import { listProduct } from "../controller/product.controller.js";

import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        files:5,
        fileSize:1*1024*1024   //1MB
    },

})

const router = Router();

/**
 * @method post
 * @route /api/products/
 * @description creates the product and save its data into DB , images will be store in imagekit.
 */
router.post("/", authenticate, authenticateseller,
     upload.array("images"), (req,res,next)=>{
  req.body?.price &&( req.body.price = JSON.parse(req.body.price))
   req.body?.sizes && ( req.body.sizes = JSON.parse(req.body.sizes))

   next()
},createProductValidator, createProduct)


router.get("/", authenticate, listAllProducts )

router.patch("/unlist/:id", authenticate, authenticateseller, unlistProductValidator,unlistProduct)
router.put("/list/:id", authenticate, authenticateseller, unlistProductValidator,listProduct)


export default router;
