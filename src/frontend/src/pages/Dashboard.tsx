import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  ClipboardList,
  FileText,
  LineChart,
  Newspaper,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import type { AppView } from "../App";
import MeasurementForm from "../components/MeasurementForm";
import MeasurementHistory from "../components/MeasurementHistory";
import NewsletterDownloadButton from "../components/NewsletterDownloadButton";
import SoilHealthCard from "../components/SoilHealthCard";

interface DashboardProps {
  onNavigate?: (view: AppView) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("entry");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Manage and analyze your soil health data
        </p>
      </div>

      {/* Success Story Promo Banner */}
      {onNavigate && (
        <button
          type="button"
          className="mb-8 w-full cursor-pointer overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-amber-500/5 to-primary/5 p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/40 text-left"
          onClick={() => onNavigate("success-story")}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Nagaraj Reddy &mdash; Organic Champion
                </p>
                <p className="text-sm text-muted-foreground">
                  58% profit margin &middot; 6+ tonnes production &middot; 16.4
                  acres &middot; Bhoomi support
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
              <span className="hidden sm:inline">View Story</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </button>
      )}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="entry" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Data Entry</span>
            <span className="sm:hidden">Entry</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
            <span className="sm:hidden">History</span>
          </TabsTrigger>
          <TabsTrigger value="health-card" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Health Card</span>
            <span className="sm:hidden">Card</span>
          </TabsTrigger>
          <TabsTrigger value="newsletter" className="gap-2">
            <Newspaper className="h-4 w-4" />
            <span className="hidden sm:inline">Newsletter</span>
            <span className="sm:hidden">News</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entry" className="space-y-6">
          <MeasurementForm />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <MeasurementHistory />
        </TabsContent>

        <TabsContent value="health-card" className="space-y-6">
          <SoilHealthCard />
        </TabsContent>

        <TabsContent value="newsletter" className="space-y-6">
          <div className="mx-auto max-w-2xl">
            <NewsletterDownloadButton />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
