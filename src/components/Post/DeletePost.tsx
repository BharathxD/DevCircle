import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation } from "react-query";

import { toast } from "@/hooks/useToast";
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
} from "@/components/UI/AlertDialog";

import { Button } from "../UI/Button";

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
        <button className="inline-flex items-center p-2 hover:bg-red-500">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
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
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={() => deletePost()}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePost;
