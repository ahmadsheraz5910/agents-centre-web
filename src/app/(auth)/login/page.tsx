import { type Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";
import BrandLogo from "@/components/BrandLogo";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";

export const metadata: Metadata = {
  title: "Login Page",
  //description: "Authentication forms built using the components.",
};

export default async function LoginPage() {
  const session = await getServerAuthSession()
  if (session) {
    return redirect('/');
  }
  return (
    <div className="container relative flex min-h-screen justify-center p-4 md:grid md:max-w-none md:grid-cols-2 md:p-0">
      <div className="p-2 md:flex md:items-center md:p-4">
        <div className="relative mx-auto my-auto flex w-full flex-col space-y-12 md:max-w-[440px]">
          <div className="flex flex-col space-y-6">
            <div className="origin-top-left scale-[0.6] md:hidden md:scale-50">
              <BrandLogo />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Login</h1>
          </div>
          <div className="space-y-4">
            <LoginForm />
            <p className="text-sm text-muted-foreground">
              {"By clicking continue, you agree to our "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>
              {" and "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden h-full bg-muted text-white md:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute left-10 top-6 flex origin-top-left scale-50 items-center">
          <BrandLogo foreground />
        </div>
      </div>
    </div>
  );
}
