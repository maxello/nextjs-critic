import { ReactNode } from "react";
import { AppSidebar } from "@/components/admin/app-sidebar";
import ThemesPicker from "@/components/ThemesPicker";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import Breadcrumbs from "@/components/Breadcrumbs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isAdminRole } from "@/lib/actions/auth";

export default async function AdminLayout({ 
  children,
}: { 
  children: ReactNode,
}) {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await isAdminRole(session.user.id);

  if (!isAdmin) redirect("/");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur">
          <div className="flex w-full justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {/* <Breadcrumbs /> */}
            </div>
            <ThemesPicker />
          </div>
        </header>
        <div className="py-4 lg:py-6 px-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}