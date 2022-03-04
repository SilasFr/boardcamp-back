import { Router } from "express";
import { getGames, postGame } from "../Controllers/gamesController.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", postGame);

export default gameRouter;
