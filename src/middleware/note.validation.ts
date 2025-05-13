import { NextFunction, Request, Response } from "express";
import noteSchema from "../validations/note.schema";


export const validateNote = (req: Request, res: Response, next: NextFunction):void | Response | any => {
  const { error } = noteSchema.validate(req.body);
console.log({error})

  if (error) {
    return res.send({ status: 400, error: error.details[0].message });
  }

  next();
};