import connection from "../database.js";

export async function customerPost(req, res, next) {
  const customer = res.locals.customer;
  try {
    console.log(customer);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
