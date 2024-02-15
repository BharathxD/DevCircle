import {
  Crown,
  Home,
  PlusSquare,
  Settings,
  UserCircle2,
  Users2,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/home", icon: Home, text: "Home", requireAuth: false },
  { href: "/profile", icon: UserCircle2, text: "Profile", requireAuth: true },
  {
    href: "/leaderboard",
    icon: Crown,
    text: "Leaderboards",
    requireAuth: true,
  },
  {
    href: "/subscribed",
    icon: Users2,
    text: "Subscribed Communities",
    requireAuth: true,
  },
  {
    href: "/d/new",
    icon: PlusSquare,
    text: "Create Community",
    requireAuth: false,
  },
  {
    href: "/settings",
    icon: Settings,
    text: "Settings",
    requireAuth: false,
  },
] as const;

export { NAV_LINKS };
