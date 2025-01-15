import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="flex items-center justify-center md:h-screen px-5">
      <div className="relative mx-auto flex w-full max-w-[400px] items-center flex-col space-y-2.5 py-4">
        <Link href="/" className="flex items-center mb-3">
          <MessageCircleMore aria-hidden="true" className="size-6 mr-1.5 text-primary" />
          <span className="font-bold tracking-wide text-lg">CR<span className="text-primary">i</span>T<span className="text-primary">i</span>C</span>
        </Link>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;