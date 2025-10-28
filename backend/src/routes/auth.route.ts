import express, { Router, Request, Response } from "express";
import { signup, login, logout } from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;