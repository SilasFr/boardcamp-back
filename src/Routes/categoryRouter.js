import { Router } from "express";
import {
  getCategory,
  postCategory,
} from "../Controllers/categoryController.js";
import { validatePostCategory } from "../middlewares/categoryMiddleware.js";

const categoryRouter = Router();

categoryRouter.get("/categories", getCategory);
categoryRouter.post("/categories", validatePostCategory, postCategory);

export default categoryRouter;
