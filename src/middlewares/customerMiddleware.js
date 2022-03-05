import { connect_timeout } from "pg/lib/defaults";
import customerSchema from "../Schemas/customerSchema.js";

export async function validateCustomerPost(req, res, next) {
  const customer = req.body;
  const { id } = req.params;
  try {
    if (!customer) {
      return res.sendStatus(404);
    }

    const { error } = customerSchema.validate(customer);
    if (error) {
      return res.send(error.details);
    }

    if (id) {
      const checkCpf = await connection.query(`
            SELECT id 
                FROM customers 
                WHERE cpf='${customer.cpf}'
        `);

      if (checkCpf.rowCount > 0) {
        let sum = 0;
        checkCpf.rows.forEach((row) => {
          if (row.id !== id) sum++;
        });
        if (sum > 0) return res.sendStatus(409);
      }
    }

    res.locals.customer = customer;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
