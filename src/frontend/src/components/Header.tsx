import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { Moon, Newspaper, Sprout, Sun, Trophy } from "lucide-react";
import { useTheme } from "next-themes";
import type { AppView } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const { setTheme } = useTheme();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === "logging-in";
  const buttonText =
    loginStatus === "logging-in"
      ? "Logging in..."
      : isAuthenticated
        ? "Logout"
        : "Login";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error("Login error:", error);
        if (error.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Branding */}
        <button
          type="button"
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          data-ocid="nav.link"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold leading-tight">Soil Health</h1>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </button>

        {/* Nav Links */}
        <nav className="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            onClick={() => onNavigate("dashboard")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              currentView === "dashboard"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            data-ocid="nav.dashboard.link"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => onNavigate("success-story")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              currentView === "success-story"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            data-ocid="nav.success_story.link"
          >
            <Trophy className="h-3.5 w-3.5" />
            Success Story
          </button>
          <button
            type="button"
            onClick={() => onNavigate("women-newsletter")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              currentView === "women-newsletter"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            data-ocid="nav.newsletter.link"
          >
            <Newspaper className="h-3.5 w-3.5" />
            Women Newsletter
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated && userProfile && (
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{userProfile.name}</p>
              <p className="text-xs text-muted-foreground">Logged in</p>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={handleAuth}
            disabled={disabled}
            variant={isAuthenticated ? "outline" : "default"}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </header>
  );
}
