import SignIn from "@/components/Auth/SignIn";

interface SignInPageProps {
  searchParams: {
    callbackUrl: string;
  };
}

export const metadata = {
  title: `Sign In`,
  description: "Sign in to your account",
};

const SignInPage: React.FC<SignInPageProps> = ({
  searchParams: { callbackUrl },
}) => {
  return (
    <SignIn
      customTitle={!!callbackUrl ? "Login Required" : undefined}
      redirectUrl={callbackUrl}
    />
  );
};

export default SignInPage;
