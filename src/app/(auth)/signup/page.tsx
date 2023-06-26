import SignUp from "@/components/Auth/SignUp";
import siteConfig from "@/config";

export const metadata = {
  title: `${siteConfig.siteName} - Sign Up`,
  description: "Sign up for an account",
};

const SignUpPage = () => <SignUp />;

export default SignUpPage;
