"use client";

import CreateFormForm from "@/components/forms/create-forum-form";

const CreatePostPage: React.FC = () => {
  return (
    <div className="mt-4 h-[91vh] md:mt-0 md:flex md:w-full md:items-center md:justify-center">
      <div className="flex size-full items-start md:container md:mx-auto md:max-w-3xl md:items-center">
        <section className="w-full rounded-lg border-2 border-zinc-800 bg-zinc-50 dark:bg-zinc-900 md:-mt-20">
          <header className="flex items-center justify-between border-b-2 border-b-zinc-800 p-5 ">
            <h1 className="text-2xl font-bold">Create a Community</h1>
          </header>
          <CreateFormForm />
        </section>
      </div>
    </div>
  );
};

export default CreatePostPage;
