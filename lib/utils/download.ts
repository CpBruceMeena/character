/**
 * Trigger a browser file download from a Blob.
 *
 * Creates a temporary anchor element, sets its href to an object URL
 * pointing to the Blob, and programmatically clicks it.  The object URL
 * is revoked immediately after the click (the browser has already
 * scheduled the download by then).
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
