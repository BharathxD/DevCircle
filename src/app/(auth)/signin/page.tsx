import SignIn from "@/components/Auth/SignIn";

interface SignInPageProps {
  searchParams: {
    unauthorized: number;
  };
}

const SignInPage: React.FC<SignInPageProps> = ({
  searchParams: { unauthorized },
}) => <SignIn customTitle={!!unauthorized ? "Login Required" : undefined} />;

export default SignInPage;
