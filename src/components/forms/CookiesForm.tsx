"use client";

import { Fragment } from "react";

import useAnalytics from "@/hooks/useAnalytics";
import { Label } from "@/components/ui/Label";

import { Switch } from "../ui/Switch";

const CookiesForm = () => {
  const { consent, setConsent } = useAnalytics();
  return (
    <Fragment>
      <div className="flex items-center justify-between space-x-2 rounded-t-md border-2 border-zinc-800 p-4">
        <Label htmlFor="functional" className="flex flex-col space-y-1">
          <span>Functional Cookies</span>
          <span className="font-normal leading-snug text-muted-foreground">
            These cookies allow the website to provide personalized
            functionality.
          </span>
        </Label>
        <Switch
          id="functional"
          onCheckedChange={(checked: boolean) => setConsent(checked)}
          checked={consent ? true : false}
        />
      </div>
      <div className="flex items-center justify-between space-x-2 rounded-b-md border-2 border-t-0 border-zinc-800 px-4 py-2">
        <p className="text-zinc-400">
          We use cookies on our site for Google Analytics
        </p>
      </div>
    </Fragment>
  );
};

export default CookiesForm;
