import joi from "joi";

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().required().min(10).max(11),
  cpf: joi.string().required().min(11).max(11),
  birthday: joi.required().isoDate(),
});

export default customerSchema;
