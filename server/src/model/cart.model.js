import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity:{
                type: Number,
                default: 1,
                min: 1
            },
            sizes:{
                type: String,
                enum: ["XS", "S", "M", "L", "XL", "XXL"]
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

const CartModel = mongoose.model("carts", cartSchema)

export default CartModel;