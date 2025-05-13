import Joi from 'joi';

const noteSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  isSynced: Joi.boolean().optional().default(false),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
});
export default noteSchema;