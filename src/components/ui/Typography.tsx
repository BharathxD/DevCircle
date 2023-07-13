import Link from "next/link";

import { cn } from "@/lib/utils";

interface TypographyProps
  extends React.HTMLAttributes<
    HTMLParagraphElement | HTMLHeadingElement | HTMLDivElement | HTMLLinkElement
  > {
  type?:
    | "heading"
    | "subheading"
    | "paragraph"
    | "email"
    | "link"
    | "special"
    | "lightweight";
  email?: string;
  href?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  type,
  children,
  className,
  email,
  href,
}) => {
  switch (type) {
    case "heading":
      return (
        <h1 className={cn("text-2xl font-extrabold", className)}>{children}</h1>
      );
    case "subheading":
      return (
        <h3 className={cn("mb-2 text-xl font-bold", className)}>{children}</h3>
      );
    case "paragraph":
      return <p className={cn("text-lg", className)}>{children}</p>;
    case "email":
      if (!email) return null;
      return (
        <Link
          href={`mailto:${email}`}
          className={cn(
            "mx-1 my-0 inline-block text-zinc-200 underline",
            className
          )}
        >
          {children}
        </Link>
      );
    case "link":
      if (!href) return null;
      return (
        <Link
          href={href}
          className={cn(
            "mx-1 my-0 inline-block text-zinc-200 underline",
            className
          )}
        >
          {children}
        </Link>
      );
    case "lightweight":
      return (
        <span
          className={cn("inline-block font-light text-zinc-200", className)}
        >
          {children}
        </span>
      );
    case "special":
      return (
        <span className={cn("inline-block text-zinc-200", className)}>
          {children}
        </span>
      );
    default:
      return <div className={cn(className)}>{children}</div>;
  }
};

export default Typography;
