
// --- utils/pdfUtils.js ---
export async function countPdfsInFolder(folderHandle) {
let pdfCount = 0;
let folderCount = 0;


async function traverse(handle) {
for await (const entry of handle.values()) {
if (entry.kind === "file") {
if (entry.name.toLowerCase().endsWith(".pdf")) pdfCount++;
} else if (entry.kind === "directory") {
folderCount++;
await traverse(entry);
}
}
}


await traverse(folderHandle);
return { pdfCount, folderCount };
}