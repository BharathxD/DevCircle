import { Fragment } from "react";

import CookiesForm from "@/components/forms/cookies-form";

export default function SettingsCookiesPage() {
  return (
    <Fragment>
      <div className="px-4 py-2">
        <h3 className="text-xl font-bold">Cookies</h3>
        <p className="text-sm text-muted-foreground">
          Manage your cookie settings here.
        </p>
      </div>
      <div className="px-4 py-2">
        <CookiesForm />
      </div>
    </Fragment>
  );
}
