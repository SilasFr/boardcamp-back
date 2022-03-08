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
    res.sendStatus(500);
  }
}

export async function postGame(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    await connection.query(
      `
      INSERT 
        INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5)
      `,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
}
