import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  Leaf,
  MapPin,
  Package,
  Users,
} from "lucide-react";
import { useState } from "react";

interface SuccessStoryProps {
  onBack?: () => void;
}

const BHOOMI_SUPPORT = [
  {
    text: "Agronomist field visits 3 times per week for on-ground guidance",
    highlight: "3\xd7 Weekly Visits",
  },
  {
    text: "Providing quality agricultural inputs tailored to crop needs",
    highlight: "Input Supply",
  },
  {
    text: "Hands-on assistance during harvesting and produce grading",
    highlight: "Harvest & Grading",
  },
  {
    text: "Facilitating market linkages and selling the produce at best prices",
    highlight: "Selling the Produce",
  },
];

export default function SuccessStory({ onBack }: SuccessStoryProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {onBack && (
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      )}

      <div className="mx-auto max-w-3xl space-y-8">
        {/* Page Title */}
        <div className="text-center">
          <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            <Leaf className="mr-1 h-3 w-3" />
            Farmer Success Story
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Nagaraj Reddy &mdash; Organic Champion
          </h1>
          <p className="mt-2 text-muted-foreground">
            Organic Cucumber Success with Bhoomi&apos;s Support
          </p>
        </div>

        {/* Main Infographic Image */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-border/40">
          {!imgLoaded && !imgError && (
            <div className="flex h-96 items-center justify-center bg-muted">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Leaf className="h-10 w-10 animate-pulse text-primary" />
                <p className="text-sm">Loading success story...</p>
              </div>
            </div>
          )}
          {imgError && (
            <div className="flex h-96 items-center justify-center bg-muted">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Leaf className="h-10 w-10 text-primary" />
                <p className="text-sm">Success story image unavailable</p>
              </div>
            </div>
          )}
          <img
            src="/assets/generated/file_0000000080a8720792eb4dd68a4ae2b9-1.dim_900x1400.png"
            alt="Success Story of Nagaraj Reddy"
            className={`w-full transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              setImgError(true);
              setImgLoaded(false);
            }}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Total Production
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                More than 6 Tonnes
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Across all vegetables grown on the farm
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
              <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Land Under Cultivation
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                16.4 Acres
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Total farm area managed organically
              </p>
            </div>
          </div>
        </div>

        {/* Bhoomi Support Section */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Bhoomi Support
              </h2>
              <p className="text-sm text-muted-foreground">
                End-to-end agronomic assistance provided to Nagaraj Reddy
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {BHOOMI_SUPPORT.map((item) => (
              <li key={item.highlight} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <span className="font-semibold text-foreground">
                    {item.highlight}:{" "}
                  </span>
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom tagline */}
        <div className="rounded-xl border border-border/40 bg-card px-6 py-4 text-center shadow-sm">
          <p className="text-base font-semibold text-foreground">
            &#127807; Inspiring Sustainable Farming &mdash; Powered by Bhoomi
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            58% Profit Margin Achieved through organic practices and expert
            agronomic support
          </p>
        </div>
      </div>
    </div>
  );
}
