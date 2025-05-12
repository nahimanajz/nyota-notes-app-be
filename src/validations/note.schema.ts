import Joi from 'joi';

const noteSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  title: Joi.string().required(),
  content: Joi.string().required(),
});
export default noteSchema;