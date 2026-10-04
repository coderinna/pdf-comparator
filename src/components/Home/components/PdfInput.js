import { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { validatePdf } from "./validatePdf";
import "./CSS/PdfInput.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

export function PdfInput({ pdfFile, setPdfFile, pdfUrl, setPdfUrl, onValidated }) {
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const fileInputRef = useRef(null); // ref inputille

  useEffect(() => {
    if (!pdfFile) {
      setThumbnail(null);
      return;
    }

    const generateThumbnail = async () => {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.2 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      setThumbnail(canvas.toDataURL());
    };

    generateThumbnail();
  }, [pdfFile]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Tyhjennä vanhat valinnat
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setError(null);
    setPdfFile(null);
    setPdfUrl(null);
    setNumPages(null);
    setThumbnail(null);

    const result = await validatePdf(file);
    if (!result.ok) {
      setError(result.error);
      e.target.value = ""; // tyhjennä input, jotta sama tiedosto voidaan valita uudelleen
      return;
    }

    const url = URL.createObjectURL(file);
    setPdfFile(file);
    setPdfUrl(url);
    setNumPages(result.numPages);
    onValidated(file);
  };

  const handlePreview = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank");
  };

  const handlePreviewClear = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfFile(null);
    setPdfUrl(null);
    setNumPages(null);
    setThumbnail(null);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // tyhjennä input, jotta uusi valinta onnistuu
    }
  };

  return (
    <div className="pdf-input-container">
      <label className="btn-select-file">
        Valitse PDF
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          className="pdf-file-input"
          ref={fileInputRef} // liitetään ref
        />
      </label>
      {error && <p className="error-text">{error}</p>}
      {pdfFile && (
        <span>
        <div className="pdf-preview">
          {thumbnail && (
            <img src={thumbnail} alt="PDF Thumbnail" className="pdf-thumbnail" />
          )}
          <div className="folder-buttons">
            <p>Tiedoston nimi: {pdfFile?.name || "Pdf-file name"}</p>
            <p>Sivumäärä: {numPages || "Page count"}</p>
            <div className="folder-buttons-container">
              <button className="btn-preview" onClick={handlePreview}>
                Esikatsele
              </button>
              <button className="btn-clear" onClick={handlePreviewClear}>
                Poista
              </button>
            </div>
          </div>

        </div>   

          </span>
      )}
    </div>
  );
}
