import { Request, Response } from 'express';
import { Note } from '../models/Note.model';

export default class NoteController {
  // Fetch all notes
  public static async getNotes(req: Request, res: Response): Promise<any> {
    try {
      const notes = await Note.findAll();
      return res.json(notes);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch notes' });
    }
  }

  // Create or update a note
  public static async createNote(req: Request, res: Response):Promise<Response | any> {
    try {
      const { title, content } = req.body;

      // Check for duplicates
      const [note, created] = await Note.findOrCreate({
        where: { title },
        defaults: { title, content },
      });

      if (!created) {
        note.title = title;
        note.content = content;
        await note.save();
      }

      // Emit real-time update
      req.app.get('io').emit('noteUpdated', note);

      return res.status(created ? 201 : 200).json(note);
    } catch (error) {
    
      return res.status(500).json({ error: 'Failed to create note' });
    }
  }
}
