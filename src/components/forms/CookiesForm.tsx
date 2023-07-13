"use client";

import { Fragment, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Label } from "@/components/ui/Label";

import { Switch } from "../ui/Switch";

const CookiesForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  useEffect(() => {
    const consentState = localStorage.getItem("cookie_consent");
    setIsChecked(consentState === "true");
    setIsLoading(false);
  }, []);

  const toggleCookieConfiguration = (value: boolean): void => {
    setIsChecked(value);
    localStorage.setItem("cookie_consent", value.toString());
  };

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
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="animate-spin" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          <Switch
            id="functional"
            onCheckedChange={toggleCookieConfiguration}
            checked={isChecked}
          />
        )}
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
