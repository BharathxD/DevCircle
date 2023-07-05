import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { Edit, Loader2, MoreVertical, Trash2 } from "lucide-react";
import { useMutation } from "react-query";

import { toast } from "@/hooks/useToast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";

interface PostDropdownMenuProps {
  onEdit: () => void;
  postId: string;
}

const PostDropdownMenu: React.FC<PostDropdownMenuProps> = ({
  onEdit,
  postId,
}) => {
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
      router.push("/");
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="absolute right-5 top-7 hover:opacity-75">
          <MoreVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={2}
        align="end"
        className="w-fit rounded-md border-2 border-zinc-800 bg-zinc-50 p-0 dark:bg-zinc-900"
      >
        <DropdownMenuItem onClick={onEdit}>
          <button className="inline-flex items-center">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:bg-red-500">
          <button onClick={() => deletePost()} disabled={isLoading}>
            {!isLoading && <Trash2 className="mr-2 h-4 w-4" />}
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostDropdownMenu;
