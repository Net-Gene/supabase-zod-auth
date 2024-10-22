import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { authStore } from "./stores/auth";
import { subscribe, useSnapshot } from "valtio";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import { useEffect } from "react";



export default function Root() {


  const authSnap = useSnapshot(authStore)
  const navigate = useNavigate()

  // https://ui.shadcn.com/docs/components/toast
  const { toast } = useToast()

  useEffect(() => {

    authStore.tryAutoLogin()

    subscribe(authStore, () => {

      if (authStore.authToast) {
        toast({
          variant: "default",
          title: "Tilin hallinta",
          description: authStore.authToast,

        },)
      }

      if (authStore.isAuth) {
        navigate("/dashboard")
      } else {
        navigate("/login")
      }

    })
  }, [navigate, toast])


  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">FullStack App</span>
          </Link>
          {authSnap.isAuth && <>
            <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Libraries
            </Link>
            <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Concepts
            </Link>
            <Link to="#" className="text-foreground transition-colors hover:text-foreground">
              Resources
            </Link>
          </>}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">FullStack App</span>
              </Link>
              {authSnap.isAuth && <>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Overview
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Libraries
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Concepts
                </Link>
                <Link to="#" className="hover:text-foreground">Resources</Link>
              </>}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            {authSnap.isAuth 
            ? <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => authStore.logout()}>
                Kirjaudu ulos
              </DropdownMenuItem>
            </DropdownMenuContent> 
            : <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/login" className="text-muted-foreground hover:text-foreground">
                  Kirjaudu
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>}
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}