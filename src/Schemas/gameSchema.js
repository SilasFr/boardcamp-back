import joi from "joi";

const gameSchema = joi.object({
  id: joi.number().required(),
  name: joi.string().required(),
  image: joi
    .string()
    .pattern(/^http:/)
    .required(),
  stockTotal: joi.number().required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().required(),
});

export default gameSchema;
