import { redirect } from "next/navigation";
import getUserWithSocialLinks from "@/actions/getUserWithSocialLinks";

import ProfileForm from "@/components/Forms/ProfileForm";

const SettingsProfilePage = async () => {
  const user = await getUserWithSocialLinks();
  if (!user) redirect("/settings/appearance");
  return (
    <section>
      <div className="px-4 py-2">
        <h3 className="text-xl font-bold">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="px-4">
        <ProfileForm
          username={user.username ?? undefined}
          bio={user.bio ?? undefined}
          urls={{
            github: user.socialMedia.github,
            linkedIn: user.socialMedia.linkedIn,
            facebook: user.socialMedia.facebook,
          }}
        />
      </div>
    </section>
  );
};

export default SettingsProfilePage;
