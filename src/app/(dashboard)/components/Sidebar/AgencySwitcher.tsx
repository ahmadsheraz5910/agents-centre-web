"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/ui-utils";
import { ArrowUpDownIcon, CheckIcon } from "lucide-react";
import { type Session } from "next-auth";
import * as React from "react";
// Todo: Add agency links somewhere
// const AgencyLinks = [
//   {
//     name: "Manage Properties",
//     icon: <Building2Icon className="mr-4 h-5 w-5" />,
//     href: "/your-properties",
//   },
//   {
//     name: "Members",
//     icon: <UsersRoundIcon className="mr-4 h-5 w-5" />,
//     href: "/favorites",
//   },
//   {
//     name: "Settings",
//     icon: <SettingsIcon className="mr-4 h-5 w-5" />,
//     href: "/",
//   },
// ];
interface Props extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  userSession: Session;
}
export default function AgencySwitcher({ className, userSession }: Props) {
  const [open, setOpen] = React.useState(false);

  const groups = [
    {
      label: "Personal Account",
      teams: [
        {
          label:
            userSession.user?.name ??
            userSession.user?.email ??
            "Personal Account",
          value: "personal",
        },
      ],
    },
    {
      label: "Teams",
      teams: [
        {
          label: "Acme Inc.",
          value: "acme-inc",
        },
        {
          label: "Monsters Inc.",
          value: "monsters",
        },
      ],
    },
  ];
  const [selectedTeam, setSelectedTeam] = React.useState<
    (typeof groups)[number]["teams"][number] | undefined
  >(groups[0]?.teams[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("justify-between bg-gray-100", className)}
        >
          <div className="flex items-center">
            <Avatar className="mr-3 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedTeam?.value}.png`}
                alt={selectedTeam?.label}
                className="grayscale"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex items-start gap-1 capitalize">
              <p>{selectedTeam?.label}</p>
            </div>
          </div>
          <ArrowUpDownIcon className="h-4 w-4 text-slate-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popper-anchor-width] p-0"
        align="start"
      >
        <Command>
          <CommandList>
            <CommandInput placeholder="Search team..." />
            <CommandEmpty>No team found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map((team) => (
                  <CommandItem
                    key={team.value}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className="text-sm capitalize"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${team.value}.png`}
                        alt={team.label}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {team.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam?.value === team.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
