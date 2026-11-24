import {Router} from "express";
import {registerValidator, loginValidator} from "../validators/auth.validator.js";
import {register,login, refresh, getme} from "../controller/auth.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/register", registerValidator, register)
router.post("/login", loginValidator, login)

//ye api new access or refresh token deta hai bna ke
router.post("/refresh", refresh)


//ye bass read ke liye use hota hai
router.get("/me", authenticate, getme)

export default router;