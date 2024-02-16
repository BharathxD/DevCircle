import {
  Crown,
  Home,
  PlusSquare,
  Settings,
  Settings2,
  Sparkle,
  UserCircle2,
  UserCog,
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

const SETTINGS_NAV_LINKS = [
  { icon: UserCog, href: "/settings", text: "Profile" },
  { icon: Sparkle, href: "/settings/appearance", text: "Appearance" },
  { icon: Settings2, href: "/settings/cookies", text: "Cookies" },
];

export { NAV_LINKS, SETTINGS_NAV_LINKS };
