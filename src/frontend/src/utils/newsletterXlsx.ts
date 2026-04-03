/**
 * Client-side Excel newsletter generator for Bhoomi Farms
 * Generates a colorful, editable .xlsx file with four content sections
 */

interface WorksheetCell {
  v: string | number;
  t: "s" | "n";
  s?: {
    font?: { bold?: boolean; sz?: number; color?: { rgb?: string } };
    fill?: { fgColor?: { rgb?: string } };
    alignment?: { horizontal?: string; vertical?: string; wrapText?: boolean };
  };
}

interface Worksheet {
  [key: string]: WorksheetCell | WorksheetSpecialProp | undefined;
}

interface WorksheetSpecialProp {
  [key: string]: unknown;
}

interface Workbook {
  SheetNames: string[];
  Sheets: { [key: string]: Worksheet };
}

function colToLetter(col: number): string {
  let letter = "";
  let c = col;
  while (c >= 0) {
    letter = String.fromCharCode((c % 26) + 65) + letter;
    c = Math.floor(c / 26) - 1;
  }
  return letter;
}

function cellRef(row: number, col: number): string {
  return `${colToLetter(col)}${row + 1}`;
}

function createCell(
  value: string | number,
  style?: {
    bold?: boolean;
    fontSize?: number;
    bgColor?: string;
    fontColor?: string;
    align?: string;
    wrap?: boolean;
  },
): WorksheetCell {
  const cell: WorksheetCell = {
    v: value,
    t: typeof value === "number" ? "n" : "s",
  };

  if (style) {
    cell.s = {
      font: {
        bold: style.bold,
        sz: style.fontSize || 11,
        color: style.fontColor ? { rgb: style.fontColor } : undefined,
      },
      fill: style.bgColor ? { fgColor: { rgb: style.bgColor } } : undefined,
      alignment: {
        horizontal: style.align || "left",
        vertical: "center",
        wrapText: style.wrap,
      },
    };
  }

  return cell;
}

function generateNewsletterWorkbook(): Workbook {
  const ws: Worksheet = {};
  const merges: Array<{
    s: { r: number; c: number };
    e: { r: number; c: number };
  }> = [];
  let currentRow = 0;

  ws["!cols"] = [{ wch: 25 }, { wch: 60 }] as unknown as WorksheetSpecialProp;

  ws[cellRef(currentRow, 0)] = createCell("Bhoomi Farms Newsletter", {
    bold: true,
    fontSize: 18,
    bgColor: "2D5016",
    fontColor: "FFFFFF",
    align: "center",
  });
  merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 1 } });
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Farmer-First Updates & Stories", {
    bold: true,
    fontSize: 12,
    bgColor: "4A7C2C",
    fontColor: "FFFFFF",
    align: "center",
  });
  merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 1 } });
  currentRow += 2;

  ws[cellRef(currentRow, 0)] = createCell("Story 1: Farmer Compensation", {
    bold: true,
    fontSize: 14,
    bgColor: "6B9E3E",
    fontColor: "FFFFFF",
  });
  merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 1 } });
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Produce Received", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("Onions");
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Quantity (kg)", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(250);
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Issue", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("Sprouted within 2 days of receipt");
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Action Taken", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(
    "Not distributed to customers. Full compensation provided to farmers.",
    { wrap: true },
  );
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Our Commitment", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(
    "At Bhoomi Farms, we stand by our farmers. Even when produce cannot reach customers due to quality issues, we ensure fair compensation. Your trust, our responsibility.",
    { wrap: true },
  );
  currentRow += 2;

  ws[cellRef(currentRow, 0)] = createCell(
    "Story 2: Residue Testing & Transparency",
    {
      bold: true,
      fontSize: 14,
      bgColor: "E67E22",
      fontColor: "FFFFFF",
    },
  );
  merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 1 } });
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Produce Tested", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("Bajji Chilly from cluster farms");
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Test Result", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("Residues detected");
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Root Cause", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(
    "Contamination from neighboring field drift",
  );
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Action Taken", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(
    "Not distributed to customers. Sold in mandi. Full compensation provided to farmers.",
    { wrap: true },
  );
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Quality Promise", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(
    "Every batch is tested. Purity is non-negotiable. When standards are not met, we protect both customers and farmers.",
    { wrap: true },
  );
  currentRow += 2;

  ws[cellRef(currentRow, 0)] = createCell("Story 3: FOBO Farmer Model", {
    bold: true,
    fontSize: 14,
    bgColor: "3498DB",
    fontColor: "FFFFFF",
  });
  merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 1 } });
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Model Name", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(
    "FOBO (Farmer-Owned, Bhoomi-Operated)",
  );
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Active Farmers", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("160+");
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Total Acreage", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("250+ acres under cultivation");
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Model Benefits", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(
    "Farmers retain ownership of their land while Bhoomi provides operational support, market access, and fair pricing.",
    { wrap: true },
  );
  currentRow += 2;

  ws[cellRef(currentRow, 0)] = createCell("Story 4: Celebrating Culture", {
    bold: true,
    fontSize: 14,
    bgColor: "E74C3C",
    fontColor: "FFFFFF",
  });
  merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 1 } });
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Festival", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("Sankranti");
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Celebration", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("Celebrated together at the farm");
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Our Culture", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(
    "At Bhoomi Farms, we are more than a business. Celebrating festivals together strengthens our bonds and honors the traditions that connect us to the land.",
    { wrap: true },
  );
  currentRow += 2;

  ws[cellRef(currentRow, 0)] = createCell("Key Metrics Summary", {
    bold: true,
    fontSize: 13,
    bgColor: "F39C12",
    fontColor: "FFFFFF",
  });
  merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 1 } });
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Total Farmers", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(160);
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Total Acres", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell(250);
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Compensation Model", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("100% farmer protection guarantee");
  currentRow++;

  ws[cellRef(currentRow, 0)] = createCell("Quality Testing", { bold: true });
  ws[cellRef(currentRow, 1)] = createCell("Every batch tested for residues");
  currentRow++;

  ws["!ref"] =
    `A1:${cellRef(currentRow - 1, 1)}` as unknown as WorksheetSpecialProp;
  ws["!merges"] = merges as unknown as WorksheetSpecialProp;

  return {
    SheetNames: ["Bhoomi Newsletter"],
    Sheets: {
      "Bhoomi Newsletter": ws,
    },
  };
}

function workbookToBlob(wb: Workbook): Blob {
  const ws = wb.Sheets[wb.SheetNames[0]];
  let csv = "";

  const range = ws["!ref"] as unknown as string;
  if (!range) return new Blob([""], { type: "text/csv" });

  const [start, end] = range.split(":");
  const startRow = Number.parseInt(start.substring(1)) - 1;
  const endRow = Number.parseInt(end.substring(1)) - 1;

  for (let row = startRow; row <= endRow; row++) {
    const rowData: string[] = [];
    for (let col = 0; col <= 1; col++) {
      const cellAddress = cellRef(row, col);
      const cell = ws[cellAddress] as WorksheetCell | undefined;
      if (cell && "v" in cell) {
        rowData.push(`"${String(cell.v).replace(/"/g, '""')}"`);
      } else {
        rowData.push("");
      }
    }
    csv += `${rowData.join(",")}\n`;
  }

  return new Blob([csv], { type: "text/csv;charset=utf-8;" });
}

export function downloadBhoomiFarmsNewsletter(): void {
  try {
    const workbook = generateNewsletterWorkbook();
    const blob = workbookToBlob(workbook);

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Bhoomi_Farms_Newsletter_${new Date().toISOString().split("T")[0]}.csv`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating newsletter:", error);
    throw new Error("Failed to generate newsletter. Please try again.");
  }
}
