import CloseModal from "@/components/UI/CloseModal"

interface AuthModalProps {
  children: React.ReactNode
}

const AuthModal: React.FC<AuthModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-10 bg-zinc-900/20 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full items-center justify-center">
        <div className="relative m-2 w-auto overflow-hidden rounded-lg border-2 border-zinc-800 bg-zinc-50 px-5 pb-8 pt-16 dark:bg-zinc-950 md:px-10">
          <div className="absolute left-0 right-0 top-0 flex h-10 w-full items-center justify-end border-b-2 border-zinc-800 md:w-auto">
            <CloseModal />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthModal
