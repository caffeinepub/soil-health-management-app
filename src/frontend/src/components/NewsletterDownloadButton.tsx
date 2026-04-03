import { Button } from "@/components/ui/button";
import { downloadBhoomiFarmsNewsletter } from "@/utils/newsletterXlsx";
import { Download, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterDownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      downloadBhoomiFarmsNewsletter();
      toast.success("Newsletter downloaded successfully!", {
        description: "Check your downloads folder for the Excel file.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download newsletter", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border bg-card p-8 text-center shadow-sm">
      <div className="rounded-full bg-primary/10 p-4">
        <FileSpreadsheet className="h-12 w-12 text-primary" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Bhoomi Farms Newsletter</h3>
        <p className="text-muted-foreground">
          Download our latest updates featuring farmer stories, quality
          commitments, and community celebrations.
        </p>
      </div>

      <div className="grid w-full max-w-md gap-3 text-left text-sm">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
          <span>Farmer compensation stories</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-0.5 h-2 w-2 rounded-full bg-orange-500" />
          <span>Residue testing transparency</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
          <span>FOBO farmer model (160+ farmers, 250+ acres)</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
          <span>Sankranti farm celebration</span>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        size="lg"
        className="w-full max-w-md gap-2"
      >
        {isDownloading ? (
          <>
            <Download className="h-5 w-5 animate-bounce" />
            Generating...
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            Download Newsletter (Excel)
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        The file will be downloaded as an editable spreadsheet that you can
        customize and share.
      </p>
    </div>
  );
}
