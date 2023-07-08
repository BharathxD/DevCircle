import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
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
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";

/**
 * Props for the DeleteForum component.
 */
interface DeleteForumProps {
  forumId: string;
  forumName: string;
}

/**
 * Component for deleting a forum.
 */
const DeleteForum: React.FC<DeleteForumProps> = ({ forumId, forumName }) => {
  const router = useRouter();
  const [confirmationText, setConfirmationText] = useState<string>();
  const { mutate: deleteForum, isLoading } = useMutation<number>({
    mutationFn: async () => {
      const { status } = await axios.delete(`/api/forum/?forumId=${forumId}`);
      return status;
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.status === StatusCodes.UNAUTHORIZED) {
          return toast({
            title: "You are not authorized to delete the forum",
            variant: "destructive",
          });
        } else if (response?.status === StatusCodes.NOT_FOUND) {
          return toast({
            title: "Uh-Oh cannot do that right now",
            description: "It's on us, please try again later",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push("/");
      toast({
        title: "Forum has been successfully deleted.",
      });
    },
  });

  const handleForumDeletion = () => deleteForum();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting the forum will permanently
            remove all the associated posts and subscriptions.
          </AlertDialogDescription>
          <p className="text-sm">
            To confirm, type &quot;d/{forumName}&quot; in the box below
          </p>
          <Input
            value={confirmationText}
            onChange={(event) => setConfirmationText(event.target.value)}
            aria-label="Input box for confirmation"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel aria-label="Cancel">Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleForumDeletion}
              isLoading={isLoading}
              aria-label="Delete"
              className="border-red-500"
              disabled={isLoading || confirmationText !== `d/${forumName}`}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteForum;
