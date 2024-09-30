import express from "express";
import {postJob, getAllJobs, getJobById, getAdminJobs} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; //middlewares for update user

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminsjobs").post(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;

//need to pass this router in index.js file