import { Router } from "express";
import {
  getCategory,
  postCategory,
} from "../Controllers/categoryController.js";
import { validatePost } from "../middlewares/categoryMiddleware.js";

const categoryRouter = Router();

categoryRouter.get("/categories", getCategory);
categoryRouter.post("/categories", validatePost, postCategory);

export default categoryRouter;
