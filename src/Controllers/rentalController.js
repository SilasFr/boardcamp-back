import connection from "../database.js";
import dayjs from "dayjs";
import { query } from "express";

export async function getRentals(req, res, next) {
  try {
    const queryCustomerId = req.query?.customerId;
    const queryGameId = req.query?.gameId;
    let filterCustomer = "";
    let filterGame = "";

    if (queryCustomerId) {
      filterCustomer = `WHERE "customerId"=${queryCustomerId}`;
    }

    if (queryGameId) {
      filterGame = `WHERE "gameId"=${queryGameId}`;
    }
    const result = await connection.query({
      text: `
      SELECT 
        rentals.*, 
        customers.id, 
        customers.name,
        games.id, 
        games.name, 
        games."categoryId",
        categories.name 
      FROM rentals
      JOIN customers ON "customerId" = customers.id
      JOIN games ON "gameId" = games.id
      JOIN categories ON games."categoryId"=categories.id
      ${filterCustomer} 
      ${filterGame}
  `,

      rowMode: "array",
    });
    res.send(
      result.rows.map((row) => {
        const [
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          CustomerId,
          CustomerName,
          GameId,
          GameName,
          categoryId,
          categoryName,
        ] = row;
        return {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: {
            id: CustomerId,
            name: CustomerName,
          },
          game: {
            id: GameId,
            name: GameName,
            categoryId,
            categoryName,
          },
        };
      })
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

export async function postNewRent(req, res, next) {
  try {
    const game = res.locals.game;
    const rental = {
      ...req.body,
      rentDate: dayjs().format("YYYY-MM-DD"),
      originalPrice: req.body.daysRented * game.pricePerDay,
      returnDate: null,
      delayFee: null,
    };

    await connection.query(
      `
      INSERT
        INTO rentals
        (
          "customerId",
          "gameId",
          "rentDate",
          "daysRented",
          "returnDate",
          "originalPrice",
          "delayFee"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        rental.customerId,
        rental.gameId,
        rental.rentDate,
        rental.daysRented,
        rental.returnDate,
        rental.originalPrice,
        rental.delayFee,
      ]
    );
    res.sendStatus(201);
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
    const returnDate = dayjs().format("YYYY-MM-DD");
    let delayFee = "";

    if (returnDate - rental.rentDate > daysRented) {
      console.log(returnDate - rental.rentDate > daysRented);
      delayFee = `"delayFee"=${
        (originalPrice / daysRented) * (returnDate - rental.rentDate)
      }`;
    }

    await connection.query(
      `
      UPDATE rentals
        SET "returnDate"='${returnDate}' 
        ${delayFee}
        WHERE id=$1
    `,
      [id]
    );
    console.log(rental);
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deleteRental(req, res, next) {
  try {
  } catch (e) {
    res.status(500).send(e);
  }
}
