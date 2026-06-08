# Task 4 - Forum API Routes

## Summary
Created 6 API route files under `src/app/api/forum/` for the Town Square forum feature.

## Files Created

### 1. `/api/forum/users/route.ts`
- **GET**: List all forum users with optional `?search=xxx` query param for filtering by name/role/company/location
- **POST**: Create or update a forum user via upsert by email. Updates lastActiveAt. Body: { name, email, bio, role, location, communities, avatarColor, company?, title? }

### 2. `/api/forum/users/[id]/route.ts`
- **GET**: Get single user by ID with their last 5 posts and comment count
- **PATCH**: Update user profile fields (name, bio, location, communities, company, title). Updates lastActiveAt.

### 3. `/api/forum/posts/route.ts`
- **GET**: List posts with pagination and filtering. Supports `?community=xxx&category=home|popular|news|explore&userId=xxx&page=1&limit=20`
  - "popular" sorts by upvotes desc
  - "news" sorts by createdAt desc
  - "explore" sorts by comment count desc (in-memory sort)
  - Default sorts by createdAt desc
  - Includes author, comment count, and user vote/heart status
  - Returns { posts, total, page, totalPages }
- **POST**: Create new post. Body: { authorId, community, title, content?, imageUrl? }

### 4. `/api/forum/posts/[id]/route.ts`
- **GET**: Get single post with author, nested comment tree (recursive build from flat parentId structure), and user vote/heart status via `?userId=xxx`
- **PATCH**: Vote/heart actions
  - { action: "vote", userId, direction: "up"|"down" } - toggles vote on/off or changes direction
  - { action: "heart", userId } - toggles heart on/off

### 5. `/api/forum/posts/[id]/comments/route.ts`
- **POST**: Add comment or reply. Body: { authorId, content, parentId? }. Validates parent comment belongs to same post. Updates post's updatedAt.

### 6. `/api/forum/seed/route.ts`
- **POST**: Seeds forum with 12 ForumUsers and 6 ForumPosts with comments. Uses upsert for users, checks if posts already exist. Returns { seeded: true, counts: { users, posts, comments } }.

## Technical Details
- All routes use `import { db } from '@/lib/db'` for database access
- All routes use `import { NextRequest, NextResponse } from 'next/server'`
- Async params pattern: `{ params }: { params: Promise<{ id: string }> }` (Next.js 16)
- Comment tree building: recursive `buildCommentTree()` function converts flat parentId structure to nested tree
- Vote logic: same direction toggles off, different direction adjusts count by 2, new vote adjusts by 1
- Heart logic: toggle on/off
- Error handling with try/catch and proper HTTP status codes
- Lint passes cleanly, db schema is in sync
