'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function AddBookmark() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const r = useRouter()
  async function submit(e: any) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/bookmarks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, url, tags }) })
    setTitle(''); setUrl(''); setTags(''); setLoading(false); r.refresh()
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4 space-y-2">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded text-sm" required />
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..." className="w-full border p-2 rounded text-sm" required />
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags (comma)" className="w-full border p-2 rounded text-sm" />
      <button type="submit" disabled={loading} className="bg-purple-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Add</button>
    </form>
  )
}
