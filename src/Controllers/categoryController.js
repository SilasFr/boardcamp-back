import connection from "../database.js";

async function getCategory(req, res, next) {
  try {
    const result = await connection.query("SELECT * FROM categories");
    res.send(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export { getCategory };
