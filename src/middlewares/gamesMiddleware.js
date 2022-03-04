import connection from "../database.js";

export async function validateGame(req, res, next) {
  try {
    const game = req.body;
    if (!game) {
      return res.sendStatus(409);
    }
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
