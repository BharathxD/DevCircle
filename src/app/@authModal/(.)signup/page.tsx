import SignUp from "@/components/Auth/SignUp";
import CloseModal from "@/components/UI/CloseModal";

const SignUpInterceptionPage = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="flex w-full items-center justify-center h-full mx-auto">
        <div className="relative bg-zinc-50 w-auto px-5 pt-16 pb-8 m-2 md:px-10 rounded-lg border border-zinc-800">
          <div className="absolute w-full md:w-auto top-0 right-0 left-0 flex h-10 items-center justify-end border-b border-zinc-800">
            <CloseModal />
          </div>
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUpInterceptionPage;
