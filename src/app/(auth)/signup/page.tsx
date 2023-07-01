import siteConfig from "@/config";

import SignUp from "@/components/Auth/SignUp";

export const metadata = {
  title: `${siteConfig.name} - Sign Up`,
  description: "Sign up for an account",
};

const SignUpPage = () => <SignUp />;

export default SignUpPage;
