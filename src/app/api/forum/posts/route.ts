import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/forum/posts - List posts with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const community = searchParams.get('community') || ''
    const category = searchParams.get('category') || 'home'
    const userId = searchParams.get('userId') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)

    const where = community ? { community } : {}

    const total = await db.forumPost.count({ where })
    const totalPages = Math.ceil(total / limit)

    // Determine sort order based on category
    let orderBy: Record<string, string> = { createdAt: 'desc' }
    if (category === 'popular') {
      orderBy = { upvotes: 'desc' }
    } else if (category === 'news') {
      orderBy = { createdAt: 'desc' }
    }

    // For "explore" category, sort by comment count desc
    // Prisma doesn't support ordering by relation count directly in SQLite,
    // so we fetch all and sort in memory
    if (category === 'explore') {
      const allPosts = await db.forumPost.findMany({
        where,
        include: {
          author: true,
          _count: { select: { comments: true } },
          votes: userId ? { where: { userId } } : false,
          heartUsers: userId ? { where: { userId } } : false,
        },
      })

      // Sort by comment count desc
      allPosts.sort((a, b) => b._count.comments - a._count.comments)

      // Paginate
      const skip = (page - 1) * limit
      const paginatedPosts = allPosts.slice(skip, skip + limit)

      const posts = paginatedPosts.map((post) => ({
        ...post,
        commentCount: post._count.comments,
        userVote: post.votes?.[0]?.direction || null,
        userHearted: (post.heartUsers?.length ?? 0) > 0,
        _count: undefined,
        votes: undefined,
        heartUsers: undefined,
      }))

      return NextResponse.json({ posts, total, page, totalPages })
    }

    const skip = (page - 1) * limit

    const dbPosts = await db.forumPost.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        author: true,
        _count: { select: { comments: true } },
        votes: userId ? { where: { userId } } : false,
        heartUsers: userId ? { where: { userId } } : false,
      },
    })

    const posts = dbPosts.map((post) => ({
      ...post,
      commentCount: post._count.comments,
      userVote: post.votes?.[0]?.direction || null,
      userHearted: (post.heartUsers?.length ?? 0) > 0,
      _count: undefined,
      votes: undefined,
      heartUsers: undefined,
    }))

    return NextResponse.json({ posts, total, page, totalPages })
  } catch (error) {
    console.error('Error fetching forum posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/forum/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { authorId, community, title, content, imageUrl } = body

    if (!authorId || !community || !title) {
      return NextResponse.json(
        { error: 'authorId, community, and title are required' },
        { status: 400 }
      )
    }

    const post = await db.forumPost.create({
      data: {
        authorId,
        community,
        title,
        content: content || null,
        imageUrl: imageUrl || null,
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating forum post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
