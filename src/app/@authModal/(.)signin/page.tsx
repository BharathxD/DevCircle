import SignIn from "@/components/Auth/SignIn";
import CloseModal from "@/components/UI/CloseModal";

interface SearchParams {
  searchParams: {
    unauthorized: boolean;
    redirectTo: string;
  };
}

const SignInInterceptionPage = ({ searchParams }: SearchParams) => {
  const { unauthorized } = searchParams;
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="flex w-full items-center justify-center h-full mx-auto">
        <div className="relative bg-zinc-50 dark:bg-zinc-950 w-auto px-5 pt-16 pb-8 m-2 md:px-10 rounded-lg border-2 border-zinc-800 overflow-hidden">
          <div className="absolute w-full md:w-auto top-0 right-0 left-0 flex h-10 items-center justify-end border-b-2  border-zinc-800">
            <CloseModal />
          </div>
          <SignIn customTitle={unauthorized ? "Login Required" : undefined} />
        </div>
      </div>
    </div>
  );
};

export default SignInInterceptionPage;
