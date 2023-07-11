import SettingsMenu from "@/components/Navigation/SettingsNav";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="container flex h-[91vh] overflow-hidden">
      <div className="my-4 w-full flex-col gap-4 overflow-hidden rounded-xl border-2 border-zinc-800">
        <div className="border-b-2 border-zinc-800 px-4 py-2">
          <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
          <p className="mt-2 text-muted-foreground">
            Manage your account settings and other preferences.
          </p>
        </div>
        <div className="flex h-full flex-col md:flex-row">
          <SettingsMenu />
          <div className="w-full overflow-hidden overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
