import { Router } from "express";
import { getCategory } from "../Controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/categorias", getCategory);

export default categoryRouter;
