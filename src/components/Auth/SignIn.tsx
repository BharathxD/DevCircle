import { FiGlobe } from "react-icons/fi";

const SignIn = () => {
  return (
    <div className="container mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[400px">
      <div className="flex flex-col space-y-2 text-center">
        <FiGlobe size={25} className="mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a BCA Community account and agree to
          our User Agreement and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignIn;
