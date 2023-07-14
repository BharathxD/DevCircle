"use client";

import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { generateCbUrl } from "@/lib/utils";
import { profileFormSchema } from "@/lib/validators/profile";
import type { ProfileFormValues } from "@/lib/validators/profile";
import { toast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
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
import { Textarea } from "@/components/ui/Textarea";

interface ProfileFormProps {
  username?: string;
  bio?: string;
  urls?: {
    linkedIn?: string;
    github?: string;
    facebook?: string;
  };
}

const ProfileForm: React.FC<ProfileFormProps> = ({ username, bio, urls }) => {
  const pathname = usePathname();
  const router = useRouter();
  const defaultValues: Partial<ProfileFormValues> = {
    username,
    bio:
      bio ?? "I'm in a college which doesn't teach anything except bakchodi.",
    urls,
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: ProfileFormValues) => {
      await axios.patch("/api/user", payload);
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          return router.push(generateCbUrl(pathname));
        }
        if (error.response?.status === StatusCodes.CONFLICT) {
          return toast({
            title: "The username is already taken",
            description: "Please choose another one.",
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
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    },
  });

  const onSubmit = (data: ProfileFormValues) => mutate(data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-fit flex-col gap-2 p-4 pt-0 lg:max-w-2xl"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="urls.linkedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="LinkedIn"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urls.github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Github"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urls.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Facebook"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="mt-2"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Update profile
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
