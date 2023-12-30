import { Button } from "@/components/ui/button";
import { cn } from "@/lib/ui-utils";
import {
  Building2Icon,
  HeartIcon,
  KanbanIcon,
  MessageSquareIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
const Links = [
  {
    name: "Overview",
    icon: <KanbanIcon className="mr-4 h-5 w-5" />,
    href: "/",
  },
  {
    name: "Properties",
    icon: <Building2Icon className="mr-4 h-5 w-5" />,
    href: "/your-properties",
  },
  {
    name: "Favorites",
    icon: <HeartIcon className="mr-4 h-5 w-5" />,
    href: "/favorites",
  },
  {
    name: "Agency",
    icon: <UsersRoundIcon className="mr-4 h-5 w-5" />,
    href: "/agency-settings",
  },
  {
    name: "Messages",
    icon: <MessageSquareIcon className="mr-4 h-5 w-5" />,
    href: "/messages",
  },
];
export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {Links.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className="w-full"
              >
                <Link href={link.href} passHref className="w-full flex items-center">
                  {link.icon}
                  {link.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
