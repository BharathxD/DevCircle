'use client'

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className='dark:bg-zinc-950 bg-gray-800 rounded-md p-4'>
      <code className='text-gray-100 text-sm'>{data.code}</code>
    </pre>
  )
}

export default CustomCodeRenderer
