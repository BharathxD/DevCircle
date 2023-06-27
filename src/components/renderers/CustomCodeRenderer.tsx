"use client"

function CustomCodeRenderer({ data }: { data: { code: string } }) {
  return (
    <pre className="rounded-md border-2 border-zinc-700 bg-zinc-800 p-4">
      <code className="text-sm text-zinc-100">{data.code}</code>
    </pre>
  )
}

export default CustomCodeRenderer
