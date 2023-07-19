import { redirect } from "next/navigation";
import { getUserWithSocialLinks } from "@/actions/getCurrentUser";

import ProfileForm from "@/components/forms/profile-form";

const SettingsProfilePage = async () => {
  const user = await getUserWithSocialLinks();
  if (!user) redirect("/settings/appearance");
  return (
    <div>
      <div className="px-4 py-2">
        <h3 className="text-xl font-bold">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <ProfileForm
        username={user.username ?? undefined}
        bio={user.bio ?? undefined}
        urls={{
          github: user.socialMedia?.github,
          linkedIn: user.socialMedia?.linkedIn,
          facebook: user.socialMedia?.facebook,
        }}
      />
    </div>
  );
};

export default SettingsProfilePage;
