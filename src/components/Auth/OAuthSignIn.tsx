import { cn } from "@/lib/utils";
import { Button } from "../UI/Button";
import { signIn } from "next-auth/react";
import { useMutation } from "react-query";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/hooks/useToast";
import { FC, Fragment, HTMLAttributes } from "react";

interface OAuthSignInProps extends HTMLAttributes<HTMLDivElement> {}

const OAuthSignIn: FC<OAuthSignInProps> = ({ className, ...props }) => {
  const { toast } = useToast();

  const { mutate: SignIn, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        await signIn("google");
      } catch (error) {
        toast({
          title: "Something went wrong...",
          description: "There was an error logging in with Google",
          variant: "destructive",
        });
      }
    },
  });

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        className="w-full"
        onClick={() => SignIn()}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {!isLoading && (
          <Fragment>
            <FcGoogle className="h-4 w-4 mr-2" />
            Google
          </Fragment>
        )}
      </Button>
    </div>
  );
};

export default OAuthSignIn;
