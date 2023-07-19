import { getAuthSession } from "@/actions/getCurrentUser";

import SettingsMenu from "@/components/navigation/settings-nav";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  return (
    <main className="container flex h-[91vh] py-4">
      <div className="no-scrollbar h-full w-full flex-col gap-4 overflow-hidden overflow-y-scroll rounded-xl border-2 border-zinc-800 md:overflow-y-hidden">
        <header className="border-b-2 border-zinc-800 px-4 py-2">
          <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
          <p className="mt-2 text-muted-foreground">
            Manage your account settings and other preferences.
          </p>
        </header>
        <div className="relative flex h-fit w-full flex-col md:h-full md:flex-row">
          <SettingsMenu isLoggedIn={!!session?.user} />
          <div className="h-fit w-full overflow-hidden overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
