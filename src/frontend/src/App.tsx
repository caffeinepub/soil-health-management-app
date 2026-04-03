import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsletterDownloadButton from "./components/NewsletterDownloadButton";
import ProfileSetupModal from "./components/ProfileSetupModal";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "./hooks/useQueries";
import Dashboard from "./pages/Dashboard";
import SuccessStory from "./pages/SuccessStory";
import WomenFarmerNewsletter from "./pages/WomenFarmerNewsletter";

export type AppView = "dashboard" | "success-story" | "women-newsletter";

export default function App() {
  const { identity, loginStatus } = useInternetIdentity();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const [currentView, setCurrentView] = useState<AppView>("dashboard");

  const isAuthenticated = !!identity;
  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && userProfile === null;
  const isInitializing = loginStatus === "initializing";

  if (isInitializing) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Initializing...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (currentView === "women-newsletter") {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <WomenFarmerNewsletter onBack={() => setCurrentView("dashboard")} />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col bg-background">
        <Header currentView={currentView} onNavigate={setCurrentView} />
        <main className="flex-1">
          {currentView === "success-story" ? (
            <SuccessStory onBack={() => setCurrentView("dashboard")} />
          ) : !isAuthenticated ? (
            <div className="container mx-auto px-4 py-16">
              <div className="mx-auto max-w-4xl space-y-12">
                <div className="text-center">
                  <img
                    src="/assets/generated/soil-testing-hero.dim_800x600.jpg"
                    alt="Soil Testing"
                    className="mx-auto mb-8 rounded-2xl shadow-2xl"
                  />
                  <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                    Soil Health Management
                  </h1>
                  <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                    Track, analyze, and optimize your soil health with
                    comprehensive monitoring and automated health cards. Login
                    to get started.
                  </p>
                </div>

                {/* Women Farmer Newsletter Promo Card */}
                <button
                  type="button"
                  className="w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-green-700/30 bg-gradient-to-br from-green-900/10 to-amber-700/10 p-6 shadow-md transition-all hover:shadow-xl hover:scale-[1.01] text-left"
                  onClick={() => setCurrentView("women-newsletter")}
                  data-ocid="newsletter.open_modal_button"
                >
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <img
                      src="/assets/generated/women-farmer-portrait.dim_300x400.png"
                      alt="Women Farmer Newsletter"
                      className="h-32 w-auto rounded-xl object-cover shadow-md"
                    />
                    <div className="text-center sm:text-left">
                      <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
                        &#127807; Women Farmer Success Story
                      </p>
                      <h3 className="mt-1 text-xl font-bold">
                        Editable Newsletter: Lakshmi Devi&apos;s Organic
                        Champion Story
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        63% profit margin &middot; 5+ tonnes production &middot;
                        Bhoomi agronomist support
                      </p>
                      <span className="mt-3 inline-block rounded-full bg-green-700 px-4 py-1.5 text-sm font-semibold text-white">
                        Edit &amp; Download Newsletter &rarr;
                      </span>
                    </div>
                  </div>
                </button>

                {/* Success Story Promo Card */}
                <button
                  type="button"
                  className="w-full cursor-pointer overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-amber-500/5 p-6 shadow-md transition-shadow hover:shadow-lg text-left"
                  onClick={() => setCurrentView("success-story")}
                >
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <img
                      src="/assets/generated/success-story-updated.dim_893x1339.png"
                      alt="Nagaraj Reddy Success Story"
                      className="h-32 w-auto rounded-xl object-cover shadow-md"
                    />
                    <div className="text-center sm:text-left">
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                        &#127807; Farmer Success Story
                      </p>
                      <h3 className="mt-1 text-xl font-bold">
                        See How Nagaraj Reddy Achieved 58% Profit Margin
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        16.4 acres &middot; 6+ tonnes production &middot; Bhoomi
                        agronomist support
                      </p>
                      <span className="mt-3 inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                        Read Success Story &rarr;
                      </span>
                    </div>
                  </div>
                </button>

                <div className="mx-auto max-w-2xl">
                  <NewsletterDownloadButton />
                </div>
              </div>
            </div>
          ) : showProfileSetup ? (
            <ProfileSetupModal />
          ) : (
            <Dashboard onNavigate={setCurrentView} />
          )}
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
