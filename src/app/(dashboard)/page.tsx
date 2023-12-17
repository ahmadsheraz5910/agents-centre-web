import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      redirect('/login')
    );
  }
  return (
    <main className="">
      
    </main>
  );
}


