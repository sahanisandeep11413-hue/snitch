import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";

export async function addToCart(req,res){
   const {productId, quantity, size} = req.body;
   const product = await productModel.findById(productId)

   if(!product){
    return res.status(404).json({
        message: "product not found"
    })
   }
   const selectedSize = product.sizes.find(s=>s.size===size)
   if(!selectedSize){
    return res.status(400).json({
        message: "invalid size"
    })
   }

   if(selectedSize.stock < quantity){
     return res.status(400).json({
        message: "insufficient stock"
     })
   }

   const cart = (await cartModel.findOne({user: req.user.userId}))
    ?? await cartModel.create({
        user:req.user.userId
    })

    const productInCart = cart.products.find(p=>(p.product.toString() ===productId)&& (p.size===size))
    if(productInCart){
      if((productInCart.quantity + quantity) > selectedSize.stock){
        return res.status(400).json({
        message:("insufficient stock")
         })
      

    }

    await cartModel.updateOne(
        {
            user:req.user.userId,
            "products.product": productID,
            "products.size": size,
        },{
            $inc:{
                "products.$.quantity": quantity
            }
        }
    )
      return res.status(201).json({
        message: "product quantity updated in cart"
    })

    }
  
    await cartModel.findOneAndUpdate(
        {
        user: req.user.userId
    },
    {
        $push:{
            product:{
                product: productId,
                quantity: quantity,
                size: size
            }
        }
    })

    return res.status(201).json({
        message: "product added to cart"
    })

   
}

export async function getCart(req,res){
    const cart = (await cartModel.findOne({user: req.user.userId}))??
    (await cartModel.create({user: req.user.userId}))

    return res.status(200).json({
        message: "cart retrieved",
        data:{
            cart: cart
        }
    })
}