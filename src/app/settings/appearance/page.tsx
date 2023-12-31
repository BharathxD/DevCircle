import { Fragment } from "react";

import AppearanceForm from "@/components/forms/appearance-form";

const SettingsAppearancePage = () => {
  return (
    <Fragment>
      <div className="px-4 py-2">
        <h3 className="text-xl font-bold">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <div className="h-full px-4 pb-2">
        <AppearanceForm />
      </div>
    </Fragment>
  );
};

export default SettingsAppearancePage;
