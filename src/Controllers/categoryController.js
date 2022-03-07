import connection from "../database.js";

export async function getCategory(req, res, next) {
  try {
    const result = await connection.query("SELECT * FROM categories");
    res.send(result.rows);
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function postCategory(req, res, next) {
  try {
    await connection.query(`
      INSERT INTO categories (name)
        VALUES ('${req.body.name}')
    `);
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
}
