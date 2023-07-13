"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Forum } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { generateCbUrl } from "@/lib/utils";
import {
  forumUpdateValidator,
  type ForumUpdatePayload,
} from "@/lib/validators/forum";
import { toast } from "@/hooks/useToast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

import DeleteForum from "../forum/DeleteForum";
import { Button } from "../ui/Button";

interface EditForumFormProps {
  forum: Forum;
}

const EditForumForm: React.FC<EditForumFormProps> = ({ forum }) => {
  const pathname = usePathname();
  const router = useRouter();
  const defaultValues: Partial<ForumUpdatePayload> = {
    forumId: forum.id,
    forumName: forum.name,
    description: forum.description ?? "",
  };
  const form = useForm<ForumUpdatePayload>({
    resolver: zodResolver(forumUpdateValidator),
    defaultValues,
    mode: "onChange",
  });
  const { mutate: updateForum, isLoading } = useMutation({
    mutationFn: async (payload: ForumUpdatePayload) => {
      const { data } = await axios.patch("/api/forum", payload);
      return data as Forum;
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          return router.push(generateCbUrl(pathname));
        }
        if (error.response?.status === StatusCodes.CONFLICT) {
          return toast({
            title: "Forum already exists",
            description: "Please choose a different name.",
            variant: "destructive",
          });
        }
        if (error.response?.status === StatusCodes.BAD_REQUEST) {
          toast({
            title: "Invalid forum name",
            description: "Please choose a name between 3 and 21 letters.",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "Something went wrong",
        description: "It's on us, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.refresh();
      toast({
        title: "Forum Updated",
        description: "Your forum has been updated successfully.",
      });
      router.push(`/d/${data.name}`);
    },
  });
  const onSubmit = (data: Omit<ForumUpdatePayload, "forumId">) => {
    if (
      data.forumName === forum.name &&
      data.description === forum.description
    ) {
      return toast({
        title: "No changes detected",
        description: "The forum will only be updated if there are any changes.",
        variant: "destructive",
      });
    }
    return updateForum({
      ...data,
      forumId: forum.id,
    });
  };
  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      for (const [, value] of Object.entries(form.formState.errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [form.formState.errors]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 py-4 md:pt-0 lg:max-w-2xl"
      >
        <FormField
          control={form.control}
          name="forumName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forum Name</FormLabel>
              <FormControl>
                <Input placeholder="forumName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                Forum/Community and description should atleast be 3 and 10
                characters respectively
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <Button type="submit" disabled={isLoading} isLoading={isLoading}>
            Update Forum
          </Button>
          <DeleteForum forumId={forum.id} forumName={forum.name} />
        </div>
      </form>
    </Form>
  );
};

export default EditForumForm;
