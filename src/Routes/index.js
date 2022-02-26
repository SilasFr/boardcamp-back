import { Router } from "express";
import categoryRouter from "./dbRouter.js";

const router = Router();

router.use(categoryRouter);

export default router;
