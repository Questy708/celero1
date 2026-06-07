# Task 5 - Town Square Frontend Rewrite to Use Backend APIs

## Agent
Backend Integration Agent

## Summary
Successfully rewrote `/home/z/my-project/src/artemis/pages/TownSquare.tsx` to use backend API routes instead of localStorage for all data operations.

## Changes Made

### 1. Type Updates
- Updated `ForumUser` interface to match API response (id, email, bio as nullable, communities as comma-separated string, lastActiveAt/createdAt/updatedAt as ISO strings, company/title as nullable)
- Updated `ForumPost` interface: added `authorId`, `author` (ForumUser), `commentCount`, `imageUrl` as nullable, `content` as nullable, replaced `authorName`/`timestamp`/`comments` with API fields
- Updated `ForumComment` interface: added `postId`, `authorId`, `parentId`, `author` as `{id, name, avatarColor, role}`, `replies` as ForumComment[]
- Removed `TownSquareUser` and `NetworkMember` interfaces (replaced by `ForumUser`)

### 2. Data Flow Changes
- **Onboarding**: Now POSTs to `/api/forum/users` to create user in DB, stores only `xcelero_townsquare_user_id` in localStorage, calls `POST /api/forum/seed` after signup
- **User Persistence**: On page load, checks localStorage for `xcelero_townsquare_user_id`, fetches user from `GET /api/forum/users/[id]`
- **Posts**: Fetched from `GET /api/forum/posts` with userId, community, category query params
- **Post Detail**: Fetched from `GET /api/forum/posts/[id]?userId=xxx` with nested comments tree
- **Voting**: `PATCH /api/forum/posts/[id]` with `{action: "vote", userId, direction}`
- **Hearts**: `PATCH /api/forum/posts/[id]` with `{action: "heart", userId}`
- **Comments**: `POST /api/forum/posts/[id]/comments` with `{authorId, content, parentId?}`
- **Network Members**: Fetched from `GET /api/forum/users` instead of SEED_MEMBERS
- **Member Profile**: Fetched from `GET /api/forum/users/[id]` with posts included

### 3. Removed Hardcoded Data
- Removed `SEED_MEMBERS` array (12 members, ~145 lines)
- Removed `PRESET_POSTS` array (6 posts, ~120 lines)
- All data now comes from the API

### 4. New Utilities
- `formatRelativeTime(dateStr)`: Converts ISO date strings to relative time ("3 hr. ago", "1 day ago", "Just now")
- `parseCommunities(communities)`: Parses comma-separated communities string from DB to array
- `getInitials(name)`: Gets initials from user name
- `PostSkeleton` and `MemberCardSkeleton`: Loading state components

### 5. UI Changes
- Banner text changed from "Posts are stored locally" to "Forum data persists in database"
- Sign out now removes `xcelero_townsquare_user_id` instead of `xcelero_townsquare_user`
- CommentNode uses `comment.author.name` and `comment.author.avatarColor` instead of `comment.author`
- Network view uses API-fetched `ForumUser[]` instead of `SEED_MEMBERS`
- Loading states added (skeletons, spinners) for posts, members, and post detail views
- Optimistic updates for voting and hearting with API sync

### 6. Kept Identical
- All CSS classes, colors, layout
- COMMUNITIES, ROLE_COLORS, ROLES constants
- OnboardingFlow UI (steps, fields, community selection)
- Hash-based router integration (`useRouter` from `@/artemis/router`)
- Framer Motion animations
- Lucide icons
- Compose modal UI
- Profile dropdown UI

## Verification
- `bun run lint` passes with 0 errors
- All API routes tested and working:
  - `POST /api/forum/seed` → returns seeded counts
  - `GET /api/forum/users` → returns 13 users
  - `GET /api/forum/posts?userId=xxx` → returns 6 posts with author data
  - `GET /api/forum/posts/[id]?userId=xxx` → returns post with nested comments tree
- Dev server running on port 3000, returning 200
