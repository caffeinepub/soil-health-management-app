import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowRight,
  Download,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type {
  ComprehensiveSoilHealthCard as HealthCard,
  ParameterComparison,
} from "../backend";
import { useGetComprehensiveSoilHealthCard } from "../hooks/useQueries";

export default function SoilHealthCard() {
  const { data: healthCard, isLoading } = useGetComprehensiveSoilHealthCard();

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!healthCard) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Soil Health Card</CardTitle>
          <CardDescription>
            Comprehensive analysis of your soil health with before/after
            comparison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm text-muted-foreground">
              Add soil measurements to generate your health card
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasComparison =
    healthCard.beforeMeasurement && healthCard.afterMeasurement;

  return (
    <div className="space-y-6">
      <Card className="print:shadow-none">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">
                Comprehensive Soil Health Card
              </CardTitle>
              <CardDescription>
                Scientific soil health assessment with before/after treatment
                comparison
              </CardDescription>
            </div>
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="print:hidden"
            >
              <Download className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Status */}
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Overall Soil Health Status
                </h3>
                <p className="mt-1 text-3xl font-bold capitalize">
                  {healthCard.status}
                </p>
              </div>
              {hasComparison && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Overall Change
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {healthCard.overallComparison.percentageChange > 0
                        ? "+"
                        : ""}
                      {healthCard.overallComparison.percentageChange.toFixed(1)}
                      %
                    </p>
                    {getTrendIcon(healthCard.overallComparison.trend)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Tabs
            defaultValue={hasComparison ? "comparison" : "averages"}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              {hasComparison && (
                <TabsTrigger value="comparison">Before/After</TabsTrigger>
              )}
              <TabsTrigger value="averages">Averages</TabsTrigger>
              <TabsTrigger value="recent">Recent Data</TabsTrigger>
            </TabsList>

            {hasComparison && (
              <TabsContent value="comparison" className="space-y-6">
                <BeforeAfterComparison healthCard={healthCard} />
              </TabsContent>
            )}

            <TabsContent value="averages" className="space-y-6">
              <AveragesView healthCard={healthCard} />
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <RecentMeasurements
                measurements={healthCard.recentMeasurements}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

const COMPARISON_PARAMS = [
  { name: "pH", key: "phComparison", unit: "" },
  { name: "EC", key: "ecComparison", unit: "dS/m" },
  { name: "OC", key: "ocComparison", unit: "%" },
  { name: "OM", key: "omComparison", unit: "%" },
  { name: "Nitrogen", key: "nitrogenComparison", unit: "kg/ha" },
  { name: "Phosphorus", key: "phosphorusComparison", unit: "kg/ha" },
  { name: "Potassium", key: "potassiumComparison", unit: "kg/ha" },
  { name: "Sulfur", key: "sulfurComparison", unit: "kg/ha" },
  { name: "Calcium", key: "calciumComparison", unit: "kg/ha" },
  { name: "Magnesium", key: "magnesiumComparison", unit: "kg/ha" },
  { name: "Sodium", key: "sodiumComparison", unit: "kg/ha" },
  { name: "Iron (Fe)", key: "feComparison", unit: "ppm" },
  { name: "Manganese (Mn)", key: "mnComparison", unit: "ppm" },
  { name: "Zinc (Zn)", key: "znComparison", unit: "ppm" },
  { name: "Copper (Cu)", key: "cuComparison", unit: "ppm" },
  { name: "CEC", key: "cecComparison", unit: "cmol/kg" },
  { name: "N per Bed", key: "nKgPerBedComparison", unit: "kg" },
  { name: "P per Bed", key: "pKgPerBedComparison", unit: "kg" },
  { name: "K per Bed", key: "kKgPerBedComparison", unit: "kg" },
] as const;

function BeforeAfterComparison({ healthCard }: { healthCard: HealthCard }) {
  const comparisons = healthCard.parameterComparisons;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Before vs. After Treatment Comparison
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {COMPARISON_PARAMS.map((item) => (
          <ComparisonCard
            key={item.key}
            name={item.name}
            comparison={comparisons[item.key] as ParameterComparison}
            unit={item.unit}
          />
        ))}
      </div>
    </div>
  );
}

function ComparisonCard({
  name,
  comparison,
  unit,
}: { name: string; comparison: ParameterComparison; unit: string }) {
  if (comparison.trend === "no comparison") return null;

  const changeColor =
    comparison.percentageChange > 5
      ? "text-green-600 dark:text-green-400"
      : comparison.percentageChange < -5
        ? "text-red-600 dark:text-red-400"
        : "text-muted-foreground";

  return (
    <div className="rounded-lg border p-4">
      <h4 className="mb-3 font-semibold">{name}</h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Before</p>
            <p className="text-lg font-bold">
              {comparison.before.toFixed(2)}
              {unit}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground">After</p>
            <p className="text-lg font-bold">
              {comparison.after.toFixed(2)}
              {unit}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-sm font-semibold ${changeColor}`}>
            {comparison.percentageChange > 0 ? "+" : ""}
            {comparison.percentageChange.toFixed(1)}%
          </p>
          <div className="flex items-center justify-end gap-1">
            {getTrendIcon(comparison.trend)}
            <span className="text-xs capitalize text-muted-foreground">
              {comparison.trend}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const AVG_PARAMS = [
  { name: "pH", avgKey: "avgPh", trendKey: "phTrend", unit: "" },
  { name: "EC", avgKey: "avgEc", trendKey: "ecTrend", unit: "dS/m" },
  { name: "OC", avgKey: "avgOc", trendKey: "ocTrend", unit: "%" },
  { name: "OM", avgKey: "avgOm", trendKey: "omTrend", unit: "%" },
  {
    name: "Nitrogen",
    avgKey: "avgNitrogen",
    trendKey: "nitrogenTrend",
    unit: "kg/ha",
  },
  {
    name: "Phosphorus",
    avgKey: "avgPhosphorus",
    trendKey: "phosphorusTrend",
    unit: "kg/ha",
  },
  {
    name: "Potassium",
    avgKey: "avgPotassium",
    trendKey: "potassiumTrend",
    unit: "kg/ha",
  },
  {
    name: "Sulfur",
    avgKey: "avgSulfur",
    trendKey: "sulfurTrend",
    unit: "kg/ha",
  },
  {
    name: "Calcium",
    avgKey: "avgCalcium",
    trendKey: "calciumTrend",
    unit: "kg/ha",
  },
  {
    name: "Magnesium",
    avgKey: "avgMagnesium",
    trendKey: "magnesiumTrend",
    unit: "kg/ha",
  },
  {
    name: "Sodium",
    avgKey: "avgSodium",
    trendKey: "sodiumTrend",
    unit: "kg/ha",
  },
  { name: "Iron (Fe)", avgKey: "avgFe", trendKey: "feTrend", unit: "ppm" },
  { name: "Manganese (Mn)", avgKey: "avgMn", trendKey: "mnTrend", unit: "ppm" },
  { name: "Zinc (Zn)", avgKey: "avgZn", trendKey: "znTrend", unit: "ppm" },
  { name: "Copper (Cu)", avgKey: "avgCu", trendKey: "cuTrend", unit: "ppm" },
  { name: "CEC", avgKey: "avgCec", trendKey: "cecTrend", unit: "cmol/kg" },
  {
    name: "N per Bed",
    avgKey: "avgNkgPerBed",
    trendKey: "nKgPerBedTrend",
    unit: "kg",
  },
  {
    name: "P per Bed",
    avgKey: "avgPkgPerBed",
    trendKey: "pKgPerBedTrend",
    unit: "kg",
  },
  {
    name: "K per Bed",
    avgKey: "avgKkgPerBed",
    trendKey: "kKgPerBedTrend",
    unit: "kg",
  },
] as const;

function AveragesView({ healthCard }: { healthCard: HealthCard }) {
  const averages = healthCard.averages;
  const analysis = healthCard.analysis;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Average Parameter Values</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AVG_PARAMS.map((item) => (
          <div key={item.avgKey} className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="mt-1 text-2xl font-bold">
                  {(averages[item.avgKey] as number).toFixed(2)}
                  {item.unit}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(analysis[item.trendKey] as string)}
                <span className="text-xs capitalize text-muted-foreground">
                  {analysis[item.trendKey] as string}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentMeasurements({ measurements }: { measurements: any[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Measurements</h3>
      <div className="space-y-3">
        {measurements.map((measurement) => (
          <div
            key={String(measurement.date)}
            className="flex flex-col gap-3 rounded-lg border p-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {format(
                    new Date(Number(measurement.date) / 1_000_000),
                    "MMM dd, yyyy",
                  )}
                </p>
                {measurement.location && (
                  <p className="text-sm text-muted-foreground">
                    {measurement.location}
                  </p>
                )}
              </div>
              <Badge
                variant="outline"
                className={getTypeColor(measurement.measurementType)}
              >
                {getTypeLabel(measurement.measurementType)}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm sm:grid-cols-6">
              <div>
                <span className="text-muted-foreground">pH:</span>{" "}
                {measurement.ph.toFixed(1)}
              </div>
              <div>
                <span className="text-muted-foreground">EC:</span>{" "}
                {measurement.ec.toFixed(1)}
              </div>
              <div>
                <span className="text-muted-foreground">N:</span>{" "}
                {measurement.nitrogen.toFixed(0)}
              </div>
              <div>
                <span className="text-muted-foreground">P:</span>{" "}
                {measurement.phosphorus.toFixed(0)}
              </div>
              <div>
                <span className="text-muted-foreground">K:</span>{" "}
                {measurement.potassium.toFixed(0)}
              </div>
              <div>
                <span className="text-muted-foreground">OC:</span>{" "}
                {measurement.oc.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getTrendIcon(trend: string) {
  if (trend === "improving" || trend === "increasing") {
    return (
      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
    );
  }
  if (trend === "declining" || trend === "decreasing") {
    return <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />;
  }
  return <Minus className="h-5 w-5 text-muted-foreground" />;
}

function getTypeColor(type: string) {
  switch (type) {
    case "before":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
    case "after":
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    case "reference":
      return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case "before":
      return "Before";
    case "after":
      return "After";
    case "reference":
      return "Reference";
    default:
      return "Daily";
  }
}

// Suppress unused import
const _Separator = Separator;
void _Separator;
