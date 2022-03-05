import customerSchema from "../Schemas/customerSchema.js";

export async function validateCustomerPost(req, res, next) {
  const customer = req.body;
  try {
    if (!customer) {
      return res.sendStatus(404);
    }

    const { error } = customerSchema.validate(customer);
    if (error) {
      return res.send(error.details);
    }

    res.locals.customer = customer;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
