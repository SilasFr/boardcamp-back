import connection from "../database.js";

async function validatePostCategory(req, res, next) {
  const newCategory = req.body;
  try {
    if (!newCategory) {
      return res.sendStatus(400);
    }

    const categories = await connection.query(
      `SELECT * 
      FROM categories 
      WHERE name='${newCategory}'`
    );

    if (categories.rows.length > 0) {
      console.log(categories);
      return res.sendStatus(409);
    }
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export { validatePostCategory };
