# API quick reference

All `/api/modules` endpoints require `Authorization: Bearer <token>`.

## Authentication

### Register
`POST /api/auth/register`

```json
{ "name": "Alex Responder", "email": "alex@example.com", "password": "a-long-password" }
```

### Login
`POST /api/auth/login`

```json
{ "email": "alex@example.com", "password": "a-long-password" }
```

## Module endpoints

- `GET /api/modules` — available module names and labels
- `GET /api/modules/:module?page=1&limit=20` — paginated records
- `POST /api/modules/:module` — create a record
- `GET /api/modules/:module/:id` — read a record
- `PATCH /api/modules/:module/:id` — update a record
- `DELETE /api/modules/:module/:id` — delete a record (admin/operator)

The exact fields for each module are defined in `server/src/config/moduleDefinitions.js`.
