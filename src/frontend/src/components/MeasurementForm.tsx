import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { CalendarIcon, Info, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MeasurementType } from "../backend";
import { useAddSoilMeasurement } from "../hooks/useQueries";

export default function MeasurementForm() {
  const [date, setDate] = useState<Date>(new Date());
  const [measurementType, setMeasurementType] = useState<MeasurementType>(
    MeasurementType.daily,
  );

  // Primary parameters
  const [ph, setPh] = useState("");
  const [ec, setEc] = useState("");
  const [oc, setOc] = useState("");
  const [om, setOm] = useState("");

  // Macronutrients
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [sulfur, setSulfur] = useState("");
  const [calcium, setCalcium] = useState("");
  const [magnesium, setMagnesium] = useState("");
  const [sodium, setSodium] = useState("");

  // Micronutrients
  const [fe, setFe] = useState("");
  const [mn, setMn] = useState("");
  const [zn, setZn] = useState("");
  const [cu, setCu] = useState("");

  // CEC
  const [cec, setCec] = useState("");

  // Per bed measurements
  const [nKgPerBed, setNKgPerBed] = useState("");
  const [pKgPerBed, setPKgPerBed] = useState("");
  const [kKgPerBed, setKKgPerBed] = useState("");

  // Metadata
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");
  const [soilType, setSoilType] = useState("");

  const addMeasurement = useAddSoilMeasurement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for required fields
    if (!ph || !ec || !oc || !om || !nitrogen || !phosphorus || !potassium) {
      toast.error("Please fill in all primary soil parameters");
      return;
    }

    const phNum = Number.parseFloat(ph);
    const ecNum = Number.parseFloat(ec);
    const ocNum = Number.parseFloat(oc);
    const omNum = Number.parseFloat(om);
    const nitrogenNum = Number.parseFloat(nitrogen);
    const phosphorusNum = Number.parseFloat(phosphorus);
    const potassiumNum = Number.parseFloat(potassium);
    const sulfurNum = Number.parseFloat(sulfur || "0");
    const calciumNum = Number.parseFloat(calcium || "0");
    const magnesiumNum = Number.parseFloat(magnesium || "0");
    const sodiumNum = Number.parseFloat(sodium || "0");
    const feNum = Number.parseFloat(fe || "0");
    const mnNum = Number.parseFloat(mn || "0");
    const znNum = Number.parseFloat(zn || "0");
    const cuNum = Number.parseFloat(cu || "0");
    const cecNum = Number.parseFloat(cec || "0");
    const nKgPerBedNum = Number.parseFloat(nKgPerBed || "0");
    const pKgPerBedNum = Number.parseFloat(pKgPerBed || "0");
    const kKgPerBedNum = Number.parseFloat(kKgPerBed || "0");

    if (phNum < 0 || phNum > 14) {
      toast.error("pH must be between 0 and 14");
      return;
    }

    try {
      await addMeasurement.mutateAsync({
        ph: phNum,
        ec: ecNum,
        oc: ocNum,
        om: omNum,
        nitrogen: nitrogenNum,
        phosphorus: phosphorusNum,
        potassium: potassiumNum,
        sulfur: sulfurNum,
        calcium: calciumNum,
        magnesium: magnesiumNum,
        sodium: sodiumNum,
        fe: feNum,
        mn: mnNum,
        zn: znNum,
        cu: cuNum,
        cec: cecNum,
        nKgPerBed: nKgPerBedNum,
        pKgPerBed: pKgPerBedNum,
        kKgPerBed: kKgPerBedNum,
        measurementType,
        notes: notes.trim() || null,
        referenceId: null,
        location: location.trim() || null,
        soilType: soilType.trim() || null,
        date: BigInt(date.getTime()) * BigInt(1_000_000),
      });

      toast.success("Soil measurement added successfully!");

      // Reset form
      setPh("");
      setEc("");
      setOc("");
      setOm("");
      setNitrogen("");
      setPhosphorus("");
      setPotassium("");
      setSulfur("");
      setCalcium("");
      setMagnesium("");
      setSodium("");
      setFe("");
      setMn("");
      setZn("");
      setCu("");
      setCec("");
      setNKgPerBed("");
      setPKgPerBed("");
      setKKgPerBed("");
      setNotes("");
      setLocation("");
      setSoilType("");
      setDate(new Date());
      setMeasurementType(MeasurementType.daily);
    } catch (error) {
      toast.error("Failed to add measurement");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Soil Measurement</CardTitle>
        <CardDescription>
          Record comprehensive soil health parameters for tracking and
          before/after comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Measurement Type */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Measurement Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    disabled={addMeasurement.isPending}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="measurementType">
                Measurement Type *
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 inline h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        Before: Initial measurement before treatment
                        <br />
                        After: Measurement after treatment/amendment
                        <br />
                        Daily: Regular monitoring measurement
                        <br />
                        Reference: Baseline measurement
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select
                value={measurementType}
                onValueChange={(value) =>
                  setMeasurementType(value as MeasurementType)
                }
                disabled={addMeasurement.isPending}
              >
                <SelectTrigger id="measurementType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={MeasurementType.before}>
                    Before Treatment
                  </SelectItem>
                  <SelectItem value={MeasurementType.after}>
                    After Treatment
                  </SelectItem>
                  <SelectItem value={MeasurementType.daily}>
                    Daily Monitoring
                  </SelectItem>
                  <SelectItem value={MeasurementType.reference}>
                    Reference/Baseline
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="primary">Primary</TabsTrigger>
              <TabsTrigger value="macro">Macronutrients</TabsTrigger>
              <TabsTrigger value="micro">Micronutrients</TabsTrigger>
              <TabsTrigger value="bed">Per Bed</TabsTrigger>
            </TabsList>

            <TabsContent value="primary" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="ph">pH Level *</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    placeholder="e.g., 6.5"
                    value={ph}
                    onChange={(e) => setPh(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ec">EC (dS/m) *</Label>
                  <Input
                    id="ec"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 1.2"
                    value={ec}
                    onChange={(e) => setEc(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oc">OC (%) *</Label>
                  <Input
                    id="oc"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 1.5"
                    value={oc}
                    onChange={(e) => setOc(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="om">OM (%) *</Label>
                  <Input
                    id="om"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 2.5"
                    value={om}
                    onChange={(e) => setOm(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="macro" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen (kg/ha) *</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 250"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus (kg/ha) *</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 30"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium (kg/ha) *</Label>
                  <Input
                    id="potassium"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 200"
                    value={potassium}
                    onChange={(e) => setPotassium(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sulfur">Sulfur (kg/ha)</Label>
                  <Input
                    id="sulfur"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 15"
                    value={sulfur}
                    onChange={(e) => setSulfur(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calcium">Calcium (kg/ha)</Label>
                  <Input
                    id="calcium"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 1500"
                    value={calcium}
                    onChange={(e) => setCalcium(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="magnesium">Magnesium (kg/ha)</Label>
                  <Input
                    id="magnesium"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 300"
                    value={magnesium}
                    onChange={(e) => setMagnesium(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sodium">Sodium (kg/ha)</Label>
                  <Input
                    id="sodium"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 50"
                    value={sodium}
                    onChange={(e) => setSodium(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cec">CEC (cmol/kg)</Label>
                  <Input
                    id="cec"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 15"
                    value={cec}
                    onChange={(e) => setCec(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="micro" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="fe">Iron (Fe) ppm</Label>
                  <Input
                    id="fe"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 4.5"
                    value={fe}
                    onChange={(e) => setFe(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mn">Manganese (Mn) ppm</Label>
                  <Input
                    id="mn"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 2.0"
                    value={mn}
                    onChange={(e) => setMn(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zn">Zinc (Zn) ppm</Label>
                  <Input
                    id="zn"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 1.0"
                    value={zn}
                    onChange={(e) => setZn(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cu">Copper (Cu) ppm</Label>
                  <Input
                    id="cu"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 0.5"
                    value={cu}
                    onChange={(e) => setCu(e.target.value)}
                    disabled={addMeasurement.isPending}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bed" className="space-y-4">
              <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                <h3 className="mb-4 font-semibold text-primary">
                  Nutrients per 350 sq ft Bed
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="nKgPerBed">N (kg per bed)</Label>
                    <Input
                      id="nKgPerBed"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="e.g., 0.5"
                      value={nKgPerBed}
                      onChange={(e) => setNKgPerBed(e.target.value)}
                      disabled={addMeasurement.isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pKgPerBed">P (kg per bed)</Label>
                    <Input
                      id="pKgPerBed"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="e.g., 0.3"
                      value={pKgPerBed}
                      onChange={(e) => setPKgPerBed(e.target.value)}
                      disabled={addMeasurement.isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kKgPerBed">K (kg per bed)</Label>
                    <Input
                      id="kKgPerBed"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="e.g., 0.4"
                      value={kKgPerBed}
                      onChange={(e) => setKKgPerBed(e.target.value)}
                      disabled={addMeasurement.isPending}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Optional Metadata */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Farm/Location Name</Label>
              <Input
                id="location"
                type="text"
                placeholder="e.g., North Field"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={addMeasurement.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type</Label>
              <Input
                id="soilType"
                type="text"
                placeholder="e.g., Loamy"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                disabled={addMeasurement.isPending}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any observations, treatments applied, or additional information..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={addMeasurement.isPending}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={addMeasurement.isPending}
          >
            {addMeasurement.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Measurement...
              </>
            ) : (
              "Add Measurement"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
