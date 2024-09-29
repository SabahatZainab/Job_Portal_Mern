import express from "express";
import {login, register, logout, updateProfile} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; //middlewares for update user

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, updateProfile); //authenticate user can only update profile for this we use middleware

export default router;

//need to pass this router in index.js file