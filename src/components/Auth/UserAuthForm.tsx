"use client";

import mergeClasses from "@/libs/mergeClasses";
import { Button } from "../UI/Button";
import { FC, HTMLAttributes, useState } from "react";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  return (
    <div className={mergeClasses("flex justify-center", className)} {...props}>
      <Button size="sm" className="w-full">
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
