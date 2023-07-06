import AppearanceForm from "@/components/forms/AppearanceForm";

const SettingsAppearancePage = () => {
  return (
    <section>
      <div className="px-4 py-2">
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <div className="px-4">
        <AppearanceForm />
      </div>
    </section>
  );
};

export default SettingsAppearancePage;
