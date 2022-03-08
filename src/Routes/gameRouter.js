import { Router } from "express";
import { getGames, postGame } from "../Controllers/gamesController.js";
import { validateGame } from "../middlewares/gamesMiddleware.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", validateGame, postGame);

export default gameRouter;
