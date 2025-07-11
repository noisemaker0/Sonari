# Agent C Plan: Mobile – Now Playing & Upload Center

## Directory
- `/mobile/screens`

## Responsibilities
- Build Now Playing screen (full player, cover art, controls, queue)
- Build Upload Center screen (music/podcast upload, progress, validation)
- Integrate with backend for playback and upload using shared API clients/types
- Implement file picker, upload progress, error handling
- Add navigation and role-based access
- Write unit tests for all components
- Merge work daily and request code review
- Communicate any changes needed to shared types or API contracts

## Tech Stack
- React Native (TypeScript)
- Expo

## Deliverables
- `NowPlaying.tsx` – Now Playing screen
- `UploadCenter.tsx` – Upload Center screen
- Navigation integration
- Role-based guards (Listener/Artist/Admin)
- Unit tests for all components

## Milestones
1. Scaffold Now Playing and Upload Center screens with placeholders
2. Integrate navigation and role-based guards
3. Implement playback and upload logic using shared API clients
4. Add file picker, upload progress, and error handling
5. Add unit tests
6. Code review and merge

## Best Practices
- Use only shared types/interfaces for data
- Add analytics events for major actions
- Document any changes to shared contracts
