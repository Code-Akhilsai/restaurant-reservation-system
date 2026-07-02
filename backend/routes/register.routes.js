import { Router } from "express";
import registerController from "../controllers/register.controllers.js";
const Register_router = Router();

Register_router.post("/register", registerController);

export default Register_router;
