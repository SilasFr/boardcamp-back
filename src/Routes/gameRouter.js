import { Router } from "express";
import { getGames } from "../Controllers/gamesController.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);

export default gameRouter;
