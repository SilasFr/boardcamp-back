import { Router } from "express";
import {
  getRentals,
  postNewRent,
  postReturn,
} from "../Controllers/rentalController.js";
import { validateNewRent } from "../middlewares/rentalMiddleware.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals", validateNewRent, postNewRent);
rentalRouter.post("/rentals/:id/return", postReturn);

export default rentalRouter;
