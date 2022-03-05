import { Router } from "express";
import { customerPost } from "../Controllers/customerControler.js";
import { validateCustomerPost } from "../middlewares/customerMiddleware.js";

const customerRouter = Router();

customerRouter.post("/customers", validateCustomerPost, customerPost);

export default customerRouter;
