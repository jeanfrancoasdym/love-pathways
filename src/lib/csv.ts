// Single CSV helper for the Google Sheets feeds (Events, Blog, Resource Hub).
// Replaces the parseCSV() that was copy-pasted into three components.

// Parse CSV text into rows of cells. Handles quoted fields containing commas,
// escaped double-quotes ("") and CRLF/LF line endings.
export function parseCSV(str: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const next = str[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++; // skip the escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      // Commit the field/row on a line break; swallow the \n of a \r\n pair.
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += char;
    }
  }

  // Flush the trailing field/row if the file didn't end with a newline.
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

// Fetch a published Google Sheet CSV and return parsed rows.
// Cache-busts so edits in the sheet show without a hard refresh.
export async function fetchSheet(url: string): Promise<string[][]> {
  const bust = url.includes("?") ? "&" : "?";
  const res = await fetch(`${url}${bust}t=${Date.now()}`);
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const text = await res.text();
  return parseCSV(text);
}
