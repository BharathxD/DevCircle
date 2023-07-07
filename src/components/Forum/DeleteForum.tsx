"use client";

import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useMutation } from "react-query";

import { toast } from "@/hooks/useToast";

import { Button } from "../UI/Button";

interface DeleteForumProps {
  forumId: string;
}

const DeleteForum: React.FC<DeleteForumProps> = ({ forumId }) => {
  const router = useRouter();
  const { mutate: deleteForum, isLoading } = useMutation<number>({
    mutationFn: async () => {
      const { status } = await axios.delete(`/api/forum/${forumId}`);
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
        title: "Forum has been deleted sucessfully",
      });
    },
  });

  const handleForumDeletion = () => deleteForum();

  return (
    <Button
      variant="destructive"
      onClick={handleForumDeletion}
      isLoading={isLoading}
      disabled={isLoading}
    >
      Delete
    </Button>
  );
};

export default DeleteForum;
