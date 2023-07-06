"use client";

import { Fragment } from "react";

import { Label } from "@/components/UI/Label";

import { Switch } from "../UI/Switch";

const CookiesForm = () => {
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
        <Switch id="functional" />
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
