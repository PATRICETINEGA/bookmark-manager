import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@bookmarks.app' },
    update: {},
    create: { email: 'demo@bookmarks.app', password },
  })

  await prisma.bookmark.upsert({
    where: { id: 'seed-bm' },
    update: {},
    create: { id: 'seed-bm', title: 'Example', url: 'https://example.com', tags: 'demo', ownerId: user.id },
  })

  console.log('Seed done')
}

main().finally(() => prisma.$disconnect())
