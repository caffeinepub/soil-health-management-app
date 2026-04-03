import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MeasurementType, SoilMeasurement } from "../backend";
import { useGetAllMeasurements } from "../hooks/useQueries";

export default function MeasurementHistory() {
  const { data: measurements, isLoading } = useGetAllMeasurements();
  const [viewMode, setViewMode] = useState<"list" | "charts">("list");
  const [filterType, setFilterType] = useState<"all" | MeasurementType>("all");

  const filteredMeasurements = useMemo(() => {
    if (!measurements) return [];
    const filtered =
      filterType === "all"
        ? measurements
        : measurements.filter((m) => m.measurementType === filterType);
    return [...filtered].sort((a, b) => Number(b.date - a.date));
  }, [measurements, filterType]);

  const chartData = useMemo(() => {
    if (!filteredMeasurements || filteredMeasurements.length === 0) return [];

    return [...filteredMeasurements]
      .sort((a, b) => Number(a.date - b.date))
      .map((m) => ({
        date: format(new Date(Number(m.date) / 1_000_000), "MMM dd"),
        pH: m.ph,
        EC: m.ec,
        OC: m.oc,
        OM: m.om,
        Nitrogen: m.nitrogen,
        Phosphorus: m.phosphorus,
        Potassium: m.potassium,
        Sulfur: m.sulfur,
        Calcium: m.calcium,
        Magnesium: m.magnesium,
        Fe: m.fe,
        Mn: m.mn,
        Zn: m.zn,
        Cu: m.cu,
        CEC: m.cec,
        "N per Bed": m.nKgPerBed,
        "P per Bed": m.pKgPerBed,
        "K per Bed": m.kKgPerBed,
        "Total Nutrient per Bed": m.nKgPerBed + m.pKgPerBed + m.kKgPerBed,
      }));
  }, [filteredMeasurements]);

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

  if (!measurements || measurements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Measurement History</CardTitle>
          <CardDescription>
            View your soil health data over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <img
              src="/assets/generated/healthy-soil-sample.dim_400x300.jpg"
              alt="Healthy Soil"
              className="mb-6 rounded-lg opacity-50"
            />
            <p className="text-lg font-medium">No measurements yet</p>
            <p className="text-sm text-muted-foreground">
              Add your first soil measurement to start tracking
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Measurement History</CardTitle>
            <CardDescription>
              {filteredMeasurements.length} measurement
              {filteredMeasurements.length !== 1 ? "s" : ""}
              {filterType !== "all" && ` (${filterType})`}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select
              value={filterType}
              onValueChange={(v) => setFilterType(v as "all" | MeasurementType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="before">Before Treatment</SelectItem>
                <SelectItem value="after">After Treatment</SelectItem>
                <SelectItem value="daily">Daily Monitoring</SelectItem>
                <SelectItem value="reference">Reference</SelectItem>
              </SelectContent>
            </Select>
            <Tabs
              value={viewMode}
              onValueChange={(v) => setViewMode(v as "list" | "charts")}
            >
              <TabsList>
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "list" ? (
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-4">
              {filteredMeasurements.map((measurement) => (
                <MeasurementCard
                  key={String(measurement.date)}
                  measurement={measurement}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Primary Parameters</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pH"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="EC"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="OC"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="OM"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">NPK Levels (kg/ha)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Nitrogen" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="Phosphorus" fill="hsl(var(--chart-3))" />
                  <Bar dataKey="Potassium" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Nutrients per 350 sq ft Bed (kg)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="N per Bed" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="P per Bed" fill="hsl(var(--chart-3))" />
                  <Bar dataKey="K per Bed" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Micronutrients (ppm)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Fe"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Mn"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Zn"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Cu"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MeasurementCard({ measurement }: { measurement: SoilMeasurement }) {
  const date = new Date(Number(measurement.date) / 1_000_000);
  const totalNutrientPerBed =
    measurement.nKgPerBed + measurement.pKgPerBed + measurement.kKgPerBed;

  const getTypeColor = (type: string) => {
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
  };

  const getTypeLabel = (type: string) => {
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
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">
              {format(date, "MMMM dd, yyyy")}
            </CardTitle>
            <CardDescription className="mt-1">
              {measurement.location && (
                <span className="font-medium">{measurement.location}</span>
              )}
              {measurement.location && measurement.soilType && (
                <span className="mx-1">&bull;</span>
              )}
              {measurement.soilType && <span>{measurement.soilType}</span>}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={getTypeColor(measurement.measurementType)}
          >
            {getTypeLabel(measurement.measurementType)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          <div>
            <p className="text-xs text-muted-foreground">pH</p>
            <p className="text-lg font-semibold">{measurement.ph.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">EC</p>
            <p className="text-lg font-semibold">{measurement.ec.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">OC (%)</p>
            <p className="text-lg font-semibold">{measurement.oc.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">OM (%)</p>
            <p className="text-lg font-semibold">{measurement.om.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">N (kg/ha)</p>
            <p className="text-lg font-semibold">
              {measurement.nitrogen.toFixed(0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">P (kg/ha)</p>
            <p className="text-lg font-semibold">
              {measurement.phosphorus.toFixed(0)}
            </p>
          </div>
        </div>

        {(measurement.nKgPerBed > 0 ||
          measurement.pKgPerBed > 0 ||
          measurement.kKgPerBed > 0) && (
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-3">
            <p className="mb-2 text-xs font-medium text-primary">
              Nutrients per 350 sq ft Bed
            </p>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">N (kg)</p>
                <p className="text-lg font-semibold">
                  {measurement.nKgPerBed.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">P (kg)</p>
                <p className="text-lg font-semibold">
                  {measurement.pKgPerBed.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">K (kg)</p>
                <p className="text-lg font-semibold">
                  {measurement.kKgPerBed.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total (kg)</p>
                <p className="text-lg font-semibold">
                  {totalNutrientPerBed.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {measurement.notes && (
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-xs font-medium text-muted-foreground">Notes</p>
            <p className="mt-1 text-sm">{measurement.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
