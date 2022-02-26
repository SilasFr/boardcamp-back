import connection from "../database.js";

async function getCategory(req, res, next) {
  try {
    const result = await connection.query("SELECT * FROM categories");
    res.send(result.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function postCategory(req, res, next) {
  try {
    await connection.query(`
      INSERT INTO categories (name)
        VALUES ('${req.body.name}')
    `);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export { getCategory, postCategory };
