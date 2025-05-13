import { Request, Response } from 'express';
import { Note } from '../models/Note.model';

export default class NoteController {
  // Fetch all notes
  public static async getNotes(req: Request, res: Response): Promise<any> {
    try {
      const data = await Note.findAll();
      const notes = data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      return res.json(notes);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch notes' });
    }
  }

  // Create or update a note
  public static async createNote(req: Request, res: Response): Promise<Response | any> {

    try {
      const { id, title, content } = req.body;
      const io = req.app.get('io');

      // Check for duplicates
      const [note, created] = await Note.findOrCreate({
        where: { title },
        defaults: { title, content },
      });

      if (!created) {
        note.title = title;
        note.content = content;
        note.id = id
        note.isSynced = true

        await note.save();
        io.emit('note:created', note);
      } else {
        io.emit('note:synced', note);
      }
      return res.status(created ? 201 : 200).json(note);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create note' });
    }

  }
}
