import * as XLSX from "xlsx";
import * as fs from "node:fs";

XLSX.set_fs(fs);

if (process.argv.length < 3) {
  console.error("Please provide an Excel file path as argument");
  process.exit(1);
}

const filePath = process.argv[2];

if (!fs.existsSync(filePath)) {
  console.error(`File ${filePath} does not exist`);
  process.exit(1);
}

// Function to extract IMDB ID from URL
function extractImdbId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/title\/(tt\d+)/);
  return match ? match[1] : null;
}

const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Find the IMDB column and extract hyperlink URLs
const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:A1");
const imdbColumnIndex = Object.keys(sheet)
  .find((key) => {
    const cell = sheet[key];
    return cell.v === "IMDB" || cell.v === "imdb" || cell.v === "IMDb";
  })
  ?.charAt(0);

if (!imdbColumnIndex) {
  console.error("Could not find IMDB column");
  process.exit(1);
}

// Process hyperlinks before converting to JSON
for (let row = range.s.r + 1; row <= range.e.r; row++) {
  const cellAddress = `${imdbColumnIndex}${row + 1}`;
  const cell = sheet[cellAddress];
  if (cell?.l?.Target) {
    // Store the URL in a new column
    const urlColumnAddress = `${String.fromCharCode(
      imdbColumnIndex.charCodeAt(0) + 1
    )}${row + 1}`;
    sheet[urlColumnAddress] = { t: "s", v: cell.l.Target };

    // Extract and store the IMDB ID
    const imdbId = extractImdbId(cell.l.Target);
    const idColumnAddress = `${String.fromCharCode(
      imdbColumnIndex.charCodeAt(0) + 2
    )}${row + 1}`;
    sheet[idColumnAddress] = { t: "s", v: imdbId || "" };
  }
}

// Add headers for the new columns
const headerRow = "1";
const urlColumnLetter = String.fromCharCode(imdbColumnIndex.charCodeAt(0) + 1);
const idColumnLetter = String.fromCharCode(imdbColumnIndex.charCodeAt(0) + 2);
sheet[`${urlColumnLetter}${headerRow}`] = { t: "s", v: "IMDB_URL" };
sheet[`${idColumnLetter}${headerRow}`] = { t: "s", v: "IMDB_ID" };

// Update the sheet range to include new columns
const lastCol = String.fromCharCode(imdbColumnIndex.charCodeAt(0) + 2);
sheet["!ref"] = sheet["!ref"]?.replace(/:[A-Z]+/, `:${lastCol}`);

// Create new workbook with processed data
const newWorkbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkbook, sheet, "Processed Data");

// Write to new file
const outputPath = filePath.replace(".xlsx", "_processed.xlsx");
XLSX.writeFile(newWorkbook, outputPath);

console.log(`Processed file saved as: ${outputPath}`);
