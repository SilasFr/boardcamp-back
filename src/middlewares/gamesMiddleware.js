import gameSchema from "../Schemas/gameSchema.js";

export async function validateGame(req, res, next) {
  const game = req.body;
  const { error } = gameSchema.validate(game);
  try {
    if (error) {
      return res.send(error.details);
    }
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
