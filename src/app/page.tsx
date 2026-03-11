
import Link from "next/link"

export default function Home(){
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">Admin Starter</h1>
        <p className="mt-2 text-gray-500">Protected admin dashboard example</p>
        <div className="mt-6 flex gap-3">
          <Link href="/login" className="px-4 py-2 bg-black text-white rounded-lg">Login</Link>
          <Link href="/admin" className="px-4 py-2 border rounded-lg">Admin</Link>
        </div>
      </div>
    </main>
  )
}
