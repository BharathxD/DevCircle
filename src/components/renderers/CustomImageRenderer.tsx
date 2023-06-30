import { useState } from "react"
import Image from "next/image"
import { ImCancelCircle } from "react-icons/im"

import { Button } from "../UI/Button"

function CustomImageRenderer({ data }: { data: { file: { url: string } } }) {
  const [open, setOpen] = useState<boolean>(false)
  const src = data.file.url

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = src
    link.download = "image.jpg"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <div className="relative min-h-[15rem] w-full">
        <Image
          alt="image"
          className="cursor-pointer object-contain"
          fill
          src={src}
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>
      {open && (
        <div className="absolute inset-0 bg-zinc-800/50 backdrop-blur-md">
          <div>
            <Image
              alt="image"
              className="cursor-pointer object-contain p-0 md:p-5"
              fill
              src={src}
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>
          <div className="absolute bottom-10 z-10 flex h-fit w-full items-center justify-center">
            <div className="flex items-center gap-2 rounded-lg border-2 border-zinc-700 bg-zinc-900 p-2">
              <Button onClick={handleDownload} variant="inverted">
                Download
              </Button>
              <Button
                onClick={() => setOpen((prev) => !prev)}
                variant="destructive"
                size="sm"
              >
                <ImCancelCircle />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CustomImageRenderer
