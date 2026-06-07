import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/forum/users - List all forum users with optional search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { role: { contains: search } },
            { company: { contains: search } },
            { location: { contains: search } },
          ],
        }
      : {}

    const users = await db.forumUser.findMany({
      where,
      orderBy: { lastActiveAt: 'desc' },
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching forum users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/forum/users - Create or update a forum user (upsert by email)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, bio, role, location, communities, avatarColor, company, title } = body

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: 'name, email, and role are required' },
        { status: 400 }
      )
    }

    const communitiesStr = Array.isArray(communities)
      ? communities.join(', ')
      : communities || ''

    const user = await db.forumUser.upsert({
      where: { email },
      update: {
        name,
        bio: bio || null,
        role,
        location: location || null,
        communities: communitiesStr,
        avatarColor: avatarColor || '#6b7280',
        company: company || null,
        title: title || null,
        lastActiveAt: new Date(),
      },
      create: {
        name,
        email,
        bio: bio || null,
        role,
        location: location || null,
        communities: communitiesStr,
        avatarColor: avatarColor || '#6b7280',
        company: company || null,
        title: title || null,
        lastActiveAt: new Date(),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/updating forum user:', error)
    return NextResponse.json(
      { error: 'Failed to create/update user' },
      { status: 500 }
    )
  }
}
