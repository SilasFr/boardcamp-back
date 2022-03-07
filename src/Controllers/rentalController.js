import connection from "../database.js";
import dayjs from "dayjs";

export async function getRentals(req, res, next) {
  try {
    const result = await connection.query(`
            SELECT *
            FROM rentals
        `);

    res.send(result.rows);
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function postNewRent(req, res, next) {
  try {
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function postReturn(req, res, next) {
  try {
    const { id } = req.params;
    const result = await connection.query(
      `
        SELECT * 
        FROM rentals
            WHERE id=$1
            LIMIT 1
    `,
      [id]
    );
    if (result.rowCount === 0) return res.sendStatus(404);

    if (result.rows[0].returnDate) return res.sendStatus(400);

    const rental = result.rows[0];
    rental.returnDate = dayjs().format("YYYY-MM-DD");

    console.log(rental);

    return res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}
