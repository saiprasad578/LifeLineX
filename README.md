# SOS Emergency Response Platform

A fresh MERN starter project for managing emergency operations. It includes a React dashboard and an Express/MongoDB API with reusable CRUD support for the currently specified modules.

## Included modules

- Communication channels
- Road blockage reports
- Facility inspections
- Incident translations
- Transportation requests
- Weather impact assessments
- Operations shift schedules
- Communication transcripts
- Resource approval requests
- Situation reports
- Public announcements
- Medical supply inventory
- Volunteer attendance
- Infrastructure damage assessments
- Incident cost estimates
- Response feedback
- Dashboard preferences

The project also includes starter authentication endpoints and role-aware middleware. Authentication is a foundation, not a production security certification.

## Requirements

- Node.js 18+
- MongoDB 6+ (local or Atlas)

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
```

Set `MONGO_URI` and `JWT_SECRET` in `server/.env`, then run:

```bash
npm run dev
```

The API starts at `http://localhost:5000`.

### 2. Frontend

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

## Demo account

Register a user through the UI. The first registered user receives the `admin` role for local development. For a public deployment, replace this behavior with an explicit administrator provisioning process.

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/modules`
- `GET /api/modules/:module`
- `POST /api/modules/:module`
- `GET /api/modules/:module/:id`
- `PATCH /api/modules/:module/:id`
- `DELETE /api/modules/:module/:id`

All module endpoints except the health check require a bearer token.

## Important scope note

This ZIP is a fresh implementation of the modules whose specifications are available in the conversation, plus a reusable foundation. It does **not** claim that all 300 historical GitHub issues have been implemented. To implement and verify every one of those issues, their exact descriptions and the original repository are needed.

## Safety and deployment

This is a development starter, not a certified emergency dispatch system. Do not rely on it for real emergency response until it has undergone security review, privacy review, operational testing, load testing, backup/recovery testing, and integration with authorized emergency-service providers. Never expose sensitive incident, medical, or location data publicly.

## Latest implementation update

Added schema-driven modules for LifeLineX issues **#212–#236**. See [docs/ISSUES_212_236.md](docs/ISSUES_212_236.md) for the issue-to-module mapping and integration limitations.
