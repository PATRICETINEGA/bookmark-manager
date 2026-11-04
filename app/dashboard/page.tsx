import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddBookmark from '@/components/AddBookmark'
import DeleteBookmarkButton from '@/components/DeleteBookmarkButton'
export default async function Dash() {
  const s = await getSession()
  if (!s) redirect('/login')
  const uid = (s.user as any).id
  const bookmarks = await prisma.bookmark.findMany({ where: { ownerId: uid }, orderBy: { createdAt: 'desc' } })
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Bookmarks</h1>
        <Link href="/api/auth/signout" className="text-sm text-red-600">Sign out</Link>
      </div>
      <AddBookmark />
      <div className="space-y-3">
        {bookmarks.map((b: any) => (
          <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
              <a href={b.url} target="_blank" rel="noreferrer" className="font-medium text-purple-600 hover:underline">{b.title}</a>
              <p className="text-sm text-gray-500 mt-1">{b.url}</p>
              {b.tags && <p className="text-xs text-gray-400 mt-1">{b.tags}</p>}
            </div>
            <DeleteBookmarkButton id={b.id} />
          </div>
        ))}
        {bookmarks.length === 0 && <p className="text-gray-500">No bookmarks yet</p>}
      </div>
    </div>
  )
}
