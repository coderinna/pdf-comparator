import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Oikea worker polku public-kansiosta
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

export async function validatePdf(file) {
  const isPdf = file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) return { ok: false, error: "Tiedosto ei ole PDF" };

  const arrayBuffer = await file.arrayBuffer();

  try {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const numPages = pdf.numPages; // Lasketaan sivumäärä

    if (numPages > 2)
      return { ok: false, error: "PDF saa olla enintään 2 sivua", numPages };

    // Placeholder: tarkista sisältääkö PDF kuvan
    const containsImage = true;
    if (!containsImage) return { ok: false, error: "PDF ei sisällä kuvaa", numPages };

    return { ok: true, numPages }; // Palautetaan myös sivumäärä
  } catch (err) {
    return { ok: false, error: "Virhe PDF-tiedoston lukemisessa: " + err.message };
  }
}
