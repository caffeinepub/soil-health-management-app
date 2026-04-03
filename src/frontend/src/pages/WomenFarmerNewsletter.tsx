import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ChevronLeft, Download, Leaf, Star } from "lucide-react";
import { useState } from "react";

interface NewsletterData {
  farmerName: string;
  cropName: string;
  location: string;
  beds: string;
  landArea: string;
  totalProduction: string;
  grossYield: string;
  netYield: string;
  totalRevenue: string;
  totalInvest: string;
  netProfit: string;
  profitPerKg: string;
  profitMargin: string;
  footerLine1: string;
  footerLine2: string;
  support1: string;
  support2: string;
  support3: string;
  support4: string;
  support5: string;
  headerColor: string;
  accentColor: string;
}

const defaultData: NewsletterData = {
  farmerName: "Lakshmi Devi",
  cropName: "Organic Tomato Success",
  location: "Bhoomi Farms, Karnataka",
  beds: "25 Beds Cultivated",
  landArea: "12.5 Acres",
  totalProduction: "More than 5 Tonnes",
  grossYield: "5,200 kg",
  netYield: "4,850 kg",
  totalRevenue: "\u20b91,04,000",
  totalInvest: "\u20b938,500",
  netProfit: "\u20b965,500",
  profitPerKg: "\u20b913.51",
  profitMargin: "63%",
  footerLine1: "63% Profit Margin Achieved!",
  footerLine2: "Inspiring Sustainable Farming!",
  support1: "Agronomist Field Visits \u2013 3 Times Weekly",
  support2: "Assisting in Harvesting & Grading",
  support3: "Selling the Produce",
  support4: "Organic Nutrient Management",
  support5: "Profit per Bed: \u20b92,620",
  headerColor: "#2d5016",
  accentColor: "#c4621d",
};

const FINANCIAL_BOXES = [
  {
    key: "revenue",
    label: "Total Revenue",
    bg: "#e8f5e1",
    border: "#4a7c28",
    labelColor: "#2d5016",
    valueColor: "#1a3a08",
  },
  {
    key: "invest",
    label: "Total Invest",
    bg: "#fff3e0",
    border: "#d4a017",
    labelColor: "#7a5a00",
    valueColor: "#4a3500",
  },
  {
    key: "profit",
    label: "Net Profit",
    bg: "#fce8d8",
    border: "#c4621d",
    labelColor: "#7a3200",
    valueColor: "#4a1800",
  },
];

const SUPPORT_KEYS: Array<keyof NewsletterData> = [
  "support1",
  "support2",
  "support3",
  "support4",
  "support5",
];

function EditField({
  label,
  value,
  onChange,
  ocid,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  ocid?: string;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-[#5a4a3a] font-medium">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 text-sm border-[#d4b896] bg-[#fdf8f0] focus:border-[#c4621d] focus:ring-[#c4621d]/20"
        data-ocid={ocid}
      />
    </div>
  );
}

function Infographic({ data }: { data: NewsletterData }) {
  const financialValues = [data.totalRevenue, data.totalInvest, data.netProfit];
  const supportItems = SUPPORT_KEYS.map((k) => data[k]).filter(Boolean);

  return (
    <div
      className="infographic-root"
      style={{
        width: "500px",
        fontFamily: "'Playfair Display', Georgia, serif",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        borderRadius: "4px",
        overflow: "hidden",
        background: "#f5f0e8",
      }}
    >
      {/* HEADER BANNER */}
      <div
        style={{
          background: data.headerColor,
          padding: "18px 20px 14px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -10,
            left: -10,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div style={{ textAlign: "center", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "2px",
            }}
          >
            <Leaf size={14} color="#a8d870" />
            <span
              style={{
                color: "#c8e88a",
                fontSize: "10px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Success Story Of An
            </span>
            <Leaf size={14} color="#a8d870" />
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 900,
              letterSpacing: "1px",
              lineHeight: 1.1,
              textTransform: "uppercase",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            ORGANIC CHAMPION
          </div>
          <div
            style={{
              marginTop: "8px",
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "20px",
              padding: "3px 16px",
            }}
          >
            <span
              style={{
                color: "#f0e0b0",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              &#10022; {data.farmerName} &#10022;
            </span>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div
        style={{
          position: "relative",
          background: `linear-gradient(rgba(20,40,10,0.55), rgba(10,25,5,0.7)), url('/assets/generated/farm-field-bg.dim_600x400.jpg') center/cover`,
          height: "200px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            top: 0,
            width: "140px",
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/generated/women-farmer-portrait.dim_300x400.png"
            alt="Women Farmer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              filter: "drop-shadow(4px 0 8px rgba(0,0,0,0.4))",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              background: "#d4a017",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <Star size={16} color="white" fill="white" />
          </div>
        </div>

        {/* Stat boxes */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 10,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              background: "#2d5016",
              border: "1.5px solid #4a7c28",
              borderRadius: "6px",
              padding: "5px 10px",
              minWidth: "150px",
            }}
          >
            <div
              style={{
                color: "#a8d870",
                fontSize: "8px",
                letterSpacing: "2px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textTransform: "uppercase",
              }}
            >
              CROP
            </div>
            <div style={{ color: "#fff", fontSize: "11px", fontWeight: 700 }}>
              {data.cropName}
            </div>
            <div style={{ color: "#c8e890", fontSize: "10px" }}>
              {data.beds}
            </div>
          </div>
          <div
            style={{
              background: "#b8860b",
              border: "1.5px solid #d4a017",
              borderRadius: "6px",
              padding: "5px 10px",
              minWidth: "150px",
            }}
          >
            <div
              style={{
                color: "#fff3cc",
                fontSize: "8px",
                letterSpacing: "2px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textTransform: "uppercase",
              }}
            >
              GROSS YIELD
            </div>
            <div style={{ color: "#fff", fontSize: "13px", fontWeight: 800 }}>
              {data.grossYield}
            </div>
          </div>
          <div
            style={{
              background: data.accentColor,
              border: "1.5px solid #e07840",
              borderRadius: "6px",
              padding: "5px 10px",
              minWidth: "150px",
            }}
          >
            <div
              style={{
                color: "#ffd4b8",
                fontSize: "8px",
                letterSpacing: "2px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textTransform: "uppercase",
              }}
            >
              NET YIELD
            </div>
            <div style={{ color: "#fff", fontSize: "13px", fontWeight: 800 }}>
              {data.netYield}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            width: "100%",
            padding: "8px 12px 8px 148px",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                color: "#a8d870",
                fontSize: "9px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "1px",
              }}
            >
              LAND AREA
            </div>
            <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>
              {data.landArea}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#a8d870",
                fontSize: "9px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "1px",
              }}
            >
              TOTAL PRODUCTION
            </div>
            <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>
              {data.totalProduction}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                color: "#d4a017",
                fontSize: "9px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "1px",
              }}
            >
              LOCATION
            </div>
            <div style={{ color: "#fff", fontSize: "10px", fontWeight: 600 }}>
              {data.location}
            </div>
          </div>
        </div>
      </div>

      {/* DATA SECTION */}
      <div style={{ background: "#f5f0e8", padding: "0" }}>
        {/* Financial banner */}
        <div
          style={{
            background: "#6b2c2c",
            padding: "7px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,200,150,0.3)",
            }}
          />
          <span
            style={{
              color: "#f5d5a0",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            &#128176; Financial Achievement
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,200,150,0.3)",
            }}
          />
        </div>

        {/* Financial boxes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "8px",
            padding: "10px 12px 6px",
          }}
        >
          {FINANCIAL_BOXES.map((box, idx) => (
            <div
              key={box.key}
              style={{
                background: box.bg,
                border: `2px solid ${box.border}`,
                borderRadius: "8px",
                padding: "8px 6px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "8px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: box.labelColor,
                  marginBottom: "3px",
                }}
              >
                {box.label}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 900,
                  color: box.valueColor,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {financialValues[idx]}
              </div>
            </div>
          ))}
        </div>

        {/* Profit per KG */}
        <div
          style={{
            margin: "0 12px 8px",
            background: "linear-gradient(135deg, #2d5016, #4a7c28)",
            borderRadius: "6px",
            padding: "6px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#c8e890",
              fontSize: "10px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            Profit per Kg
          </span>
          <span
            style={{
              color: "#fff",
              fontSize: "16px",
              fontWeight: 900,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {data.profitPerKg}
          </span>
          <span
            style={{
              color: "#c8e890",
              fontSize: "10px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            Excellent Return!
          </span>
        </div>

        {/* Bhoomi Support banner */}
        <div
          style={{
            background: "#6b4c2c",
            padding: "6px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,220,150,0.3)",
            }}
          />
          <span
            style={{
              color: "#f5d5a0",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            &#127807; Bhoomi Support
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,220,150,0.3)",
            }}
          />
        </div>

        {/* Checklist */}
        <div style={{ padding: "8px 16px 10px" }}>
          {supportItems.map((item, i) => (
            <div
              key={`support-${i + 1}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 0",
                borderBottom:
                  i < supportItems.length - 1
                    ? "1px dashed rgba(100,80,40,0.2)"
                    : "none",
              }}
            >
              <CheckCircle2 size={14} color="#4a7c28" fill="#e8f5e1" />
              <span
                style={{
                  color: "#3a2810",
                  fontSize: "11px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            background: `linear-gradient(135deg, ${data.headerColor}, #4a7c28)`,
            padding: "12px 16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: "16px",
              fontWeight: 900,
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            &#127942; {data.footerLine1}
          </div>
          <div
            style={{
              color: "#c8e890",
              fontSize: "11px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              letterSpacing: "1px",
              marginTop: "2px",
            }}
          >
            {data.footerLine2}
          </div>
          <div
            style={{
              marginTop: "8px",
              fontSize: "8px",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "1px",
            }}
          >
            BHOOMI FARMS &middot; ORGANIC EXCELLENCE &middot; WOMEN EMPOWERMENT
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  onBack?: () => void;
}

export default function WomenFarmerNewsletter({ onBack }: Props) {
  const [data, setData] = useState<NewsletterData>(defaultData);

  const update = (key: keyof NewsletterData) => (v: string) =>
    setData((prev) => ({ ...prev, [key]: v }));

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-[#fdf6ec]">
      {/* EDIT PANEL */}
      <aside
        className="print:hidden w-[340px] shrink-0 border-r border-[#e0cdb0] bg-[#fdf8f0] flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        {/* Panel Header */}
        <div className="bg-[#2d5016] px-4 py-3 flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="text-[#a8d870] hover:text-white transition-colors"
              data-ocid="newsletter.link"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <div>
            <h2 className="text-white font-bold text-sm tracking-wide">
              Newsletter Editor
            </h2>
            <p className="text-[#a8d870] text-xs">
              Edit fields to update preview
            </p>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-3">
          <Accordion
            type="multiple"
            defaultValue={["identity", "yield", "financial"]}
            className="space-y-2"
          >
            <AccordionItem
              value="identity"
              className="border border-[#e0cdb0] rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-3 py-2.5 bg-[#f5ecd8] text-[#3a2810] text-xs font-bold uppercase tracking-wider hover:no-underline hover:bg-[#eee0c0]">
                &#128100; Identity
              </AccordionTrigger>
              <AccordionContent className="px-3 pt-2 pb-3 space-y-2.5 bg-white">
                <EditField
                  label="Farmer Name"
                  value={data.farmerName}
                  onChange={update("farmerName")}
                  ocid="newsletter.farmer_name.input"
                />
                <EditField
                  label="Crop Name"
                  value={data.cropName}
                  onChange={update("cropName")}
                  ocid="newsletter.crop_name.input"
                />
                <EditField
                  label="Location"
                  value={data.location}
                  onChange={update("location")}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="yield"
              className="border border-[#e0cdb0] rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-3 py-2.5 bg-[#f5ecd8] text-[#3a2810] text-xs font-bold uppercase tracking-wider hover:no-underline hover:bg-[#eee0c0]">
                &#127807; Yield Stats
              </AccordionTrigger>
              <AccordionContent className="px-3 pt-2 pb-3 space-y-2.5 bg-white">
                <EditField
                  label="Beds"
                  value={data.beds}
                  onChange={update("beds")}
                />
                <EditField
                  label="Land Area"
                  value={data.landArea}
                  onChange={update("landArea")}
                />
                <EditField
                  label="Total Production"
                  value={data.totalProduction}
                  onChange={update("totalProduction")}
                />
                <EditField
                  label="Gross Yield"
                  value={data.grossYield}
                  onChange={update("grossYield")}
                  ocid="newsletter.gross_yield.input"
                />
                <EditField
                  label="Net Yield"
                  value={data.netYield}
                  onChange={update("netYield")}
                  ocid="newsletter.net_yield.input"
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="financial"
              className="border border-[#e0cdb0] rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-3 py-2.5 bg-[#f5ecd8] text-[#3a2810] text-xs font-bold uppercase tracking-wider hover:no-underline hover:bg-[#eee0c0]">
                &#128176; Financial
              </AccordionTrigger>
              <AccordionContent className="px-3 pt-2 pb-3 space-y-2.5 bg-white">
                <EditField
                  label="Total Revenue"
                  value={data.totalRevenue}
                  onChange={update("totalRevenue")}
                  ocid="newsletter.revenue.input"
                />
                <EditField
                  label="Total Investment"
                  value={data.totalInvest}
                  onChange={update("totalInvest")}
                  ocid="newsletter.investment.input"
                />
                <EditField
                  label="Net Profit"
                  value={data.netProfit}
                  onChange={update("netProfit")}
                  ocid="newsletter.profit.input"
                />
                <EditField
                  label="Profit per Kg"
                  value={data.profitPerKg}
                  onChange={update("profitPerKg")}
                />
                <EditField
                  label="Profit Margin %"
                  value={data.profitMargin}
                  onChange={update("profitMargin")}
                />
                <EditField
                  label="Footer Line 1"
                  value={data.footerLine1}
                  onChange={update("footerLine1")}
                />
                <EditField
                  label="Footer Line 2"
                  value={data.footerLine2}
                  onChange={update("footerLine2")}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="support"
              className="border border-[#e0cdb0] rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-3 py-2.5 bg-[#f5ecd8] text-[#3a2810] text-xs font-bold uppercase tracking-wider hover:no-underline hover:bg-[#eee0c0]">
                &#127807; Bhoomi Support
              </AccordionTrigger>
              <AccordionContent className="px-3 pt-2 pb-3 space-y-2.5 bg-white">
                <EditField
                  label="Support 1"
                  value={data.support1}
                  onChange={update("support1")}
                />
                <EditField
                  label="Support 2"
                  value={data.support2}
                  onChange={update("support2")}
                />
                <EditField
                  label="Support 3"
                  value={data.support3}
                  onChange={update("support3")}
                />
                <EditField
                  label="Support 4"
                  value={data.support4}
                  onChange={update("support4")}
                />
                <EditField
                  label="Support 5"
                  value={data.support5}
                  onChange={update("support5")}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="colors"
              className="border border-[#e0cdb0] rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-3 py-2.5 bg-[#f5ecd8] text-[#3a2810] text-xs font-bold uppercase tracking-wider hover:no-underline hover:bg-[#eee0c0]">
                &#127912; Colors
              </AccordionTrigger>
              <AccordionContent className="px-3 pt-2 pb-3 bg-white">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-[#5a4a3a] font-medium">
                      Header Color
                    </Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={data.headerColor}
                        onChange={(e) => update("headerColor")(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border border-[#d4b896]"
                      />
                      <span className="text-xs text-[#7a6a5a]">
                        {data.headerColor}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-[#5a4a3a] font-medium">
                      Accent Color
                    </Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={data.accentColor}
                        onChange={(e) => update("accentColor")(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border border-[#d4b896]"
                      />
                      <span className="text-xs text-[#7a6a5a]">
                        {data.accentColor}
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>

        {/* Download Button */}
        <div className="p-3 border-t border-[#e0cdb0] bg-[#fdf8f0]">
          <Button
            type="button"
            onClick={handleDownload}
            className="w-full bg-[#2d5016] hover:bg-[#3d6820] text-white font-bold text-sm gap-2"
            data-ocid="newsletter.download.button"
          >
            <Download size={16} />
            Download / Print PDF
          </Button>
          <p className="text-center text-[10px] text-[#9a8a7a] mt-2">
            Use browser&apos;s &quot;Save as PDF&quot; option
          </p>
        </div>
      </aside>

      {/* PREVIEW PANEL */}
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-6 overflow-auto bg-[#ede8de]">
        <div className="print:hidden mb-4 flex items-center gap-3 self-start">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-[#5a4a3a] uppercase tracking-widest">
            Live Preview
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-xs text-[#9a8a7a]">
            Changes update in real-time
          </span>
        </div>

        <div data-ocid="newsletter.canvas_target">
          <Infographic data={data} />
        </div>

        <div className="print:hidden mt-6 text-center max-w-sm">
          <p className="text-xs text-[#8a7a6a]">
            Edit fields in the left panel to customize the newsletter. Click
            &quot;Download / Print PDF&quot; to save.
          </p>
        </div>
      </main>
    </div>
  );
}
