import { Button } from "@/components/ui/button";
import { cn } from "@/lib/ui-utils";
import {
  Building2Icon,
  HeartIcon,
  KanbanIcon,
  MessageSquareIcon,
  PlusIcon,
  UsersRoundIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AgencySwitcher from "./AgencySwitcher";
import { type Session } from "next-auth";


const ExploreLinks = [
  {
    name: "Properties",
    icon: (
      <Image
        width={20}
        height={20}
        alt={"Explore Properties"}
        src={"/svgs/telescope.svg"}
        className="mr-4"
      />
    ),
    href: "/your-properties",
  },
  {
    name: "Agencies",
    icon: <Building2Icon className="mr-4 h-5 w-5" />,
    href: "/messages",
  },
  {
    name: "Agents",
    icon: <UsersRoundIcon className="mr-4 h-5 w-5" />,
    href: "/agency-settings",
  },
];
const PersonalLinks = [
  {
    name: "Dashboard",
    icon: <KanbanIcon className="mr-4 h-5 w-5" />,
    href: "/",
  },
  {
    name: "Messages",
    icon: <MessageSquareIcon className="mr-4 h-5 w-5" />,
    href: "/messages",
  },
  {
    name: "Your Properties",
    icon: <Building2Icon className="mr-4 h-5 w-5" />,
    href: "/your-properties",
  },
  {
    name: "Your Favorites",
    icon: <HeartIcon className="mr-4 h-5 w-5" />,
    href: "/favorites",
  },
];

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  userSession:Session
}
export function Sidebar({ className,userSession }: Props) {
  
  return (
    <div className={cn("", className)}>
      <div className="space-y-4">
        <div className="border-b px-3 py-4">
          <AgencySwitcher userSession={userSession} className="w-full"  />
        </div>
        <div className="border-b px-3 py-2">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            {"EXPLORE"}
          </p>
          <div className="space-y-1">
            {ExploreLinks.map((link) => (
              <Button key={link.name} variant="ghost" className="w-full">
                <Link
                  href={link.href}
                  passHref
                  className="flex w-full items-center"
                >
                  {link.icon}
                  {link.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            {"PERSONAL"}
          </p>
          <div className="space-y-1">
            {PersonalLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className="w-full text-slate-800"
              >
                <Link
                  href={link.href}
                  passHref
                  className="flex w-full items-center"
                >
                  {link.icon}
                  {link.name}
                </Link>
              </Button>
            ))}
          </div>
          <Button
            className="my-2 flex w-full items-center justify-center gap-2 font-medium"
            variant={"secondary"}
          >
            <PlusIcon className="h-5 w-5" />
            <p className="mr-2">{"Add a Property"}</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
