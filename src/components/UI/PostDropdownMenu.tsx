import { Edit, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";

import DeletePost from "../Post/DeletePost";

interface PostDropdownMenuProps {
  onEdit: () => void;
  postId: string;
}

const PostDropdownMenu: React.FC<PostDropdownMenuProps> = ({
  onEdit,
  postId,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="absolute right-4 top-4 outline-none hover:opacity-75">
          <MoreVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={10}
        align="end"
        className="w-fit rounded-md border-2 border-zinc-800 bg-zinc-50 p-0 dark:bg-zinc-900"
      >
        <DropdownMenuItem onClick={onEdit}>
          <button className="inline-flex w-full items-center">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:bg-red-500">
          <DeletePost postId={postId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostDropdownMenu;
