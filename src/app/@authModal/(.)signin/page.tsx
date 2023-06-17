import SignIn from "@/components/Auth/SignIn";
import CloseModal from "@/components/UI/CloseModal";

const SignInInterceptionPage = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="flex w-full items-center justify-center h-full mx-auto">
        <div className="relative bg-zinc-50 w-auto px-5 pt-16 pb-8 m-2 md:px-2 rounded-lg border border-zinc-700">
          <div className="absolute w-full md:w-auto top-0 right-0 left-0 flex h-10 items-center justify-end border-b border-zinc-700">
            <CloseModal />
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default SignInInterceptionPage;
