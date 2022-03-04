import connection from "../database.js";

export async function getGames(req, res, next) {
  try {
    const games = await connection.query(`
            SELECT games.*, categories.name as "categoryName" FROM games
            JOIN categories 
                ON games."categoryId"=categories.id
        `);
    if (games.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.send(games.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function postGame(req, res, next) {
  const game = req.locals.game;
  try {
    if (!game) {
      return res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
