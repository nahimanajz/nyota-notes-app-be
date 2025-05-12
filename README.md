## Notes Sync Application
This is a full-stack application that allows users to create notes offline on their mobile devices (Android/iOS) and sync them to a remote database when online. The backend is built using Node.js, Express, PostgreSQL, and Socket.IO for real-time updates.

## Features
### RESTful API:
- `GET /notes:` Fetch all notes from the database.
- `POST /notes:` Create a new note or update an existing one.
### Real-Time Updates:
- Uses Socket.IO to emit events when notes are created or updated.
### Offline Support:
- Notes created offline are stored locally on the device and synced to the backend when the device is back online.
### Database:
Data is persisted in a PostgreSQL database using Sequelize ORM.

## Tools and Technologies
### Backend:
- Node.js
- Express.js
- Sequelize (PostgreSQL)
- Socket.IO
### Frontend:
- React Native (Expo Bare Workflow)
- AsyncStorage or SQLite for offline storage
## Database:
- PostgreSQL

### API Endpoints
1. `GET /api/notes`
Fetch all notes from the database.
 ### Request
```
GET /api/notes HTTP/1.1
Host: localhost:3000 
```
### Response
``` 
[
  {
    "id": "3b64c8d4-e47c-400f-a25d-16c7ecb85650",
    "title": "Sample Note",
    "content": "This is a sample note.",
    "updatedAt": "2025-05-12T10:00:00.000Z"
  }
]

```

2. ` POST /api/notes `
Create a new note or update an existing one.

 ### Request
```
POST /api/notes HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "title": "New Note",
  "content": "This is the content of the new note."
}

```
### Response
``` 

  {
    "id": "3b64c8d4-e47c-400f-a25d-16c7ecb85650",
    "title": "Sample Note",
    "content": "This is a sample note.",
    "updatedAt": "2025-05-12T10:00:00.000Z"
  }


```
## Syncing Data from Local Device to Remote Database
#### Offline Mode:

Notes are stored locally on the device using AsyncStorage
Each note is assigned a unique `title` to prevent duplication.
#### Online Mode:

When the device comes back online, unsynced notes are sent to the backend in a batch using the POST `/api/notes` endpoint.
The backend checks for duplicates using the `title` and either creates or updates the note.
#### Real-Time Updates:

The backend emits a `noteUpdated` event via Socket.IO to notify all connected clients about the changes.

## Installation guid
 Prerequisites
- Node.js installed
- PostgreSQL database set up
```
 git clone https://github.com/nahimanajz/nyota-notes-app-be.git
 cd nyota-notes-app-be
 npm install 
 cp .env.example .env //fill required environment variables
 npm dev
```
## How test APIS 
1. fetch all notes
```
curl -X GET http://localhost:3000/api/notes   
```
2. create notes APIs
``` 
curl -X POST http://localhost:3000/api/notes \
-H "Content-Type: application/json" \
-d '{"title": "New Note", "content": "This is the content of the new note."}'

```