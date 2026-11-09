# SOS Emergency Response — Full-Stack Starter

A starter MERN application covering GitHub issues #295–#304:

1. Emergency Communication Channels
2. Road Blockage Reports
3. Facility Inspections
4. Incident Translation
5. Transportation Requests
6. Weather Impact Assessments
7. Operations Shift Scheduling
8. Incident Communication Transcripts
9. Resource Request Approvals
10. Situation Reports

## Tech stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose

## Requirements
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

## Run the backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Edit `server/.env` and set `MONGO_URI`.

## Run the frontend
Open a second terminal:
```bash
cd client
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:5000/api`.

## API overview
Each module has a REST API under `/api/<module>`.
- `GET /api/<module>` — list records
- `GET /api/<module>/:id` — get one record
- `POST /api/<module>` — create a record
- `PATCH /api/<module>/:id` — update a record
- `DELETE /api/<module>/:id` — delete a record

Modules and fields are defined in `server/config/modules.js`.

## Important security note
This is a development starter, not a production-ready emergency service. Before real deployment:
- Add authentication and role-based access control.
- Validate user identity and incident access on the server.
- Add rate limiting, audit logs, backups, monitoring, and HTTPS.
- Do not use this starter to dispatch real emergency services without professional review.
- Avoid storing sensitive medical or personal data until privacy and security controls are implemented.
