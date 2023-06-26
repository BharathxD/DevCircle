"use client";

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-zinc-800 border-2 border-zinc-700 rounded-md p-4">
      <code className="text-zinc-100 text-sm">{data.code}</code>
    </pre>
  );
}

export default CustomCodeRenderer;
