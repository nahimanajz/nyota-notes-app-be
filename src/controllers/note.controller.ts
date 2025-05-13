import { Request, Response } from 'express';
import { Note } from '../models/Note.model';

export default class NoteController {
  // Fetch all notes
  public static async getNotes(req: Request, res: Response): Promise<any> {
    try {
      const notes = await Note.findAll();
      return res.json(notes);
    } catch (error) {
      console.log({error})
      return res.status(500).json({ error: 'Failed to fetch notes' });
    }
  }

  // Create or update a note
  public static async createNote(req: Request, res: Response):Promise<Response | any> {
    console.log("this is the body", {body: req.body})
    
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
        note.id =id
        
        await note.save();
        io.emit('note:created', note);
      } else {
          io.emit('note:synced', note);
      }
     console.log({sentId:id, retrievedId: note.dataValues.id})

      return res.status(created ? 201 : 200).json(note);
    } catch (error) {
     console.log("Error while creating a note", {error})
      return res.status(500).json({ error: 'Failed to create note' });
    }
      
  }
}
