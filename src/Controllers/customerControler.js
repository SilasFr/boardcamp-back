import connection from "../database.js";

export async function customerPost(req, res, next) {
  const { name, phone, cpf, birthday } = res.locals.customer;
  try {
    await connection.query(`
        INSERT 
        INTO customers (name, phone, cpf, birthday) 
        VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')
    `);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getCustomers(req, res, next) {
  const { id } = req.params;
  try {
    let idFilter = "";
    if (id) {
      idFilter = `WHERE id=${id} LIMIT 1`;
    }
    const result = await connection.query(`
        SELECT * 
        FROM customers
        ${idFilter}
      `);

    res.send(result.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res, next) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = res.locals.customer;
  try {
    if (!id) {
      return res.sendStatus(404);
    }

    await connection.query(`
    UPDATE customers
        SET name='${name}', 
            phone='${phone}', 
            cpf='${cpf}', 
            birthday='${birthday}' 
        WHERE id=${id}
    `);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
