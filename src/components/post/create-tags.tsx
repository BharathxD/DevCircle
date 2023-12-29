"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CreateTagProps {
  onAddTag: (tagsToAdd: string[]) => void;
  onDelete: (tagToDelete: string) => void;
  initialTags?: string[];
}

const CreateTags: FC<CreateTagProps> = ({
  onAddTag,
  onDelete,
  initialTags,
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const tagRef = useRef<HTMLInputElement>(null);

  const handleKeyAddition = useCallback(() => {
    const tag = tagRef.current?.value;
    if (!tag || tag.length === 0) return;

    if (tags.length === 5) {
      toast({
        title: "Maximum tag limit reached",
        description: "You can add a maximum of 5 tags.",
        variant: "destructive",
      });
      return;
    }

    const lowerCaseTag = tag.toLowerCase().trim();
    if (tags.includes(lowerCaseTag)) {
      toast({
        title: "Duplicate tags are not allowed",
        description: `The tag '${tag}' is already in use.`,
        variant: "destructive",
      });
      return;
    }

    setTags((prevTags) => {
      const updatedTags = [...prevTags, lowerCaseTag];
      onAddTag(updatedTags);
      return updatedTags;
    });
    tagRef.current.value = "";
  }, [onAddTag, tags]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      handleKeyAddition();
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyAddition, tags]);

  const removeTag = useCallback(
    (tag: string) => {
      setTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag));
      onDelete(tag);
    },
    [onDelete]
  );

  return (
    <div className="no-scrollbar flex h-min w-full flex-row items-center justify-start gap-2">
      {tags.length !== 5 && (
        <Fragment>
          <Input
            className={cn("w-[100px] py-1")}
            ref={tagRef}
            disabled={tags.length === 5}
            placeholder="Add Tags..."
          />
          <Button
            variant="outline"
            onClick={handleKeyAddition}
            disabled={tags.length === 5}
          >
            <AiOutlinePlus />
          </Button>
        </Fragment>
      )}
      {tags && tags.length !== 0 && (
        <div className="no-scrollbar flex flex-row gap-2 overflow-hidden overflow-x-scroll rounded-md">
          {tags.map((tag, index) => (
            <div
              className="flex flex-row items-center justify-between gap-1 rounded-md border-2 border-zinc-800 bg-zinc-800 px-4 py-1.5 text-zinc-50 hover:cursor-pointer hover:border-red-500 hover:bg-red-500 dark:text-zinc-300"
              key={index}
              onClick={() => removeTag(tag)}
            >
              <p>{tag}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateTags;
