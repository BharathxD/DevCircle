import SignIn from "@/components/Auth/SignIn";
import siteConfig from "@/config";

interface SignInPageProps {
  searchParams: {
    unauthorized: number;
  };
}

export const metadata = {
  title: `${siteConfig.name} - Sign In`,
  description: "Sign in to your account",
};

const SignInPage: React.FC<SignInPageProps> = ({
  searchParams: { unauthorized },
}) => <SignIn customTitle={!!unauthorized ? "Login Required" : undefined} />;

export default SignInPage;
