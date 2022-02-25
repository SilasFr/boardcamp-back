import { Router } from "express";
import dbRouter from "./dbRouter.js";

const router = Router();

router.use(dbRouter);

export default router;
