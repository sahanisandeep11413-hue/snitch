import {readAccessToken} from "../utils/auth.utils.js"; 

export function authenticate(req,res,next){
   
      // console.log("Headers:", req.headers);
    //console.log("Authorization:", req.headers.authorization);

    const accessToken = req.headers.Authorization?.split(" ")[1];
    console.log(accessToken)
    if(!accessToken){
        return res.status(401).json({
            message: "access token not found in the request header"
        })
    }

    try{
        const decoded = readAccessToken(accessToken)

        req.user  = decoded
       // req.user = {userId, role}
        next()
    }catch(err){
        return res.status(401).json({
            message: "invalid access token"
        })
    }
}

export function authenticateseller (req,res,next){
        if(req.user.role !== "seller"){
            return res.status(403).json({
                message: "user is not authorized to perform this function a "
            })
            
        }
        next()
}