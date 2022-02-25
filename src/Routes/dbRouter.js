import { Router } from "express";
import { getCategory } from "../Controllers/categoryController.js";

const dbRouter = Router();

dbRouter.get("/categorias", getCategory);

export default dbRouter;
