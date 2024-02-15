import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation } from "react-query";

import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";

interface PostDropdownMenuProps {
  postId: string;
}

const DeletePost: React.FC<PostDropdownMenuProps> = ({ postId }) => {
  const router = useRouter();
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/forum/post/?postId=${postId}`);
    },
    onError: async (error: unknown) => {
      if (
        error instanceof AxiosError &&
        error.response?.status === StatusCodes.UNAUTHORIZED
      ) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to delete this post.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. The post could not be deleted.",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Succesfully deleted the post",
      });
      router.push("/");
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="inline-flex w-full items-center p-2 hover:bg-red-500 hover:text-zinc-50">
          <Trash2 className="mr-1.5 size-4" />
          <p>Delete</p>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-2 border-zinc-800 p-6">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="destructive" aria-label="Cancel">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="border-2 border-red-600 bg-transparent text-zinc-800 hover:bg-red-500 hover:text-zinc-50 dark:border-0 dark:bg-red-600 dark:text-zinc-50"
          >
            <Button
              variant="destructive"
              onClick={() => deletePost()}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePost;
