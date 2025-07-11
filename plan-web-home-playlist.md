# Agent A Plan: Web – Home Feed & Playlist View

## Directory
- `/web/src/pages`

## Responsibilities
- Build Home Feed screen (discovery, trending, personalized content)
- Build Playlist View screen (public/private, add/remove songs)
- Implement navigation and role-based access
- Use shared types and API clients from `/shared`
- Add loading, error, and empty states
- Write unit tests for all components
- Merge work daily and request code review
- Communicate any changes needed to shared types or API contracts

## Tech Stack
- React (TypeScript)
- Tailwind CSS

## Deliverables
- `Home.tsx` – Home Feed screen
- `Playlist.tsx` – Playlist View screen
- Navigation integration
- Role-based guards (Listener/Artist/Admin)
- Unit tests for all components

## Milestones
1. Scaffold Home and Playlist screens with placeholders
2. Integrate navigation and role-based guards
3. Fetch and display data using shared API clients
4. Implement loading, error, and empty states
5. Add unit tests
6. Code review and merge

## Best Practices
- Use only shared types/interfaces for data
- Use Tailwind for all styling
- Add analytics events for major actions
- Document any changes to shared contracts
