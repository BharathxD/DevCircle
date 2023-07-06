"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import ProfileForm from "@/components/forms/ProfileForm";

const SettingsProfilePage = async () => {
  const session = useSession();
  if (session.status === "unauthenticated") redirect("/settings/appearance");
  return (
    <section>
      <div className="px-4 py-2">
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="px-4">
        <ProfileForm />
      </div>
    </section>
  );
};

export default SettingsProfilePage;
