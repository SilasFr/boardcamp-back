import connection from "../database.js";
import rentalSchema from "../Schemas/rentalSchema.js";

export async function validateNewRent(req, res, next) {
  try {
    const rent = req.body;

    const { error } = rentalSchema.validate(rent);
    if (error) {
      return res.status(400).send(error.details);
    }

    const user = await connection.query(
      `
        SELECT * FROM users WHERE id=$1 LIMIT 1
    `,
      [rent.customerId]
    );
    if (user.rowCount === 0) return res.sendStatus(400);

    const game = await connection.query(
      `
        SELECT * FROM games WHERE id=$1 LIMIT 1
    `,
      [rent.gameId]
    );
    if (game.rowCount === 0) return res.sendStatus(400);

    const openRentals = await connection.query(
      `
        SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate"=null
    `,
      [rent.gameId]
    );
    if (openRentals.rowCount >= game.stockTotal) return res.sendStatus(400);

    next();
  } catch (e) {
    res.sendStatus(500);
  }
}
