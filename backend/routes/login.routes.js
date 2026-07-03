import { Router } from "express";
import loginController from "../controllers/login.controllers.js";

const Login_router = Router();

Login_router.post("/login", loginController);

export default Login_router;
