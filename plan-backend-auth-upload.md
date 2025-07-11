# Agent D Plan: Backend – Auth API & Song Upload API

## Directory
- `/backend/api`

## Responsibilities
- Implement Auth API: signup, login, email verification, JWT issuance
- Implement Song Upload API: file upload (AWS S3), audio metadata extraction
- Use shared types and OpenAPI/Swagger for API contracts
- Ensure secure password handling, JWT, and email verification
- Integrate with AWS S3 for uploads
- Write unit and integration tests for all endpoints
- Merge work daily and request code review
- Communicate any changes needed to shared types or API contracts

## Tech Stack
- Node.js, Express, PostgreSQL, TypeScript

## Deliverables
- `auth.ts` – Auth API endpoints
- `upload.ts` – Song Upload API endpoints
- OpenAPI/Swagger docs for all endpoints
- Unit and integration tests

## Milestones
1. Scaffold Auth and Upload API endpoints with OpenAPI docs
2. Implement secure password handling, JWT, email verification
3. Integrate S3 upload and audio metadata extraction
4. Add unit and integration tests
5. Code review and merge

## Best Practices
- Use only shared types/interfaces for data
- Document all endpoints in OpenAPI/Swagger
- Add analytics/logging for major actions
- Document any changes to shared contracts
