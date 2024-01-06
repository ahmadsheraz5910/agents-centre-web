import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { type PropsWithChildren } from "react";
import { BellIcon, MailIcon } from "lucide-react";
import { ProfileDropdown } from "./components/profile-dropdown";
import { Separator } from "@/components/ui/separator";
import { CommandMenu } from "./components/CommandMenu";
import PurposeSelector from "./components/PurposeSelector";
import { Sidebar } from "./components/Sidebar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";


export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      redirect('/login')
    );
  }
  return (
    <>
      <header className="flex items-center border-b px-8">
        <div className="max-w-[64px] ">
          <BrandLogo iconOnly={true} />
        </div>
        <Separator orientation="vertical" className="ml-8 h-20" />
        <PurposeSelector className="ml-6" />
        <Separator orientation="vertical" className="ml-6 h-20" />
        <div className="flex flex-1 items-center">
          <CommandMenu className="ml-8 flex-1" />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center gap-2">
            <Button className="h-auto p-2" variant={"outline"}>
              <BellIcon className="h-5 w-5 fill-slate-100 text-primary/80" />
            </Button>
            <Button className="h-auto p-2" variant={"outline"}>
              <MailIcon className="h-5 w-5 fill-slate-100 text-primary/80" />
            </Button>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <ProfileDropdown />
        </div>
      </header>
      <main className="flex">
        <aside className="max-h-[calc(100vh-81px)] w-64 overflow-auto border-r">
          <Sidebar userSession={session} />
        </aside>
        <div className="flex-1">{children}</div>
      </main>
    </>    
  );
}
