import { Router } from "express";
import {
  customerPost,
  getCustomers,
  updateCustomer,
} from "../Controllers/customerControler.js";
import { validateCustomerPost } from "../middlewares/customerMiddleware.js";

const customerRouter = Router();

customerRouter.post("/customers", validateCustomerPost, customerPost);
customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomers);
customerRouter.put("/customers/:id", validateCustomerPost, updateCustomer);

export default customerRouter;
