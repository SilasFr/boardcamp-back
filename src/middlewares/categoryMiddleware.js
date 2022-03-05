import connection from "../database.js";
import categorySchema from "../Schemas/categorySchema.js";

export async function validatePostCategory(req, res, next) {
  const newCategory = req.body;
  const { error } = categorySchema.validate(newCategory);

  try {
    if (error) {
      return res.send(error.details);
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
