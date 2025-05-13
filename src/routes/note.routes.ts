import { Router, Request, Response } from "express";
import NoteController from "../controllers/note.controller";
import { validateNote } from "../middleware/note.validation";

const router = Router();

router.get("/notes", NoteController.getNotes);
router.post("/notes", validateNote, NoteController.createNote);

export default router;
