import { Router } from "express";
import {
  deleteRental,
  getRentals,
  postNewRent,
  postReturn,
} from "../Controllers/rentalController.js";
import { validateNewRent } from "../middlewares/rentalMiddleware.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals", validateNewRent, postNewRent);
rentalRouter.post("/rentals/:id/return", postReturn);
rentalRouter.delete("/rentals/:id", deleteRental);

export default rentalRouter;
