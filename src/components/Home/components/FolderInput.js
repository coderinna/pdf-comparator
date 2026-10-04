import { useState } from "react";
import { countPdfsInFolder } from "./countPdfsInFolder";
import "./CSS/FolderInput.css";

// --- components/FolderInput.jsx ---
export function FolderInput({ onFolderReady }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [folderName, setFolderName] = useState(null); // uuden folderin nimi

  const handlePick = async () => {
    setStats(null);
    setFolderName(null);
    onFolderReady(null, null);
    setError(null);

    try {
      setLoading(true);
      const folderHandle = await window.showDirectoryPicker();

      const { pdfCount, folderCount } = await countPdfsInFolder(folderHandle);

      if (folderCount > 100) {
        setError("Valittu kansio on liian suuri");
        setLoading(false);
        return;
      }

      if (pdfCount > 1000) {
        setError("Valittu kansio sisältää yli 1000 PDF-tiedostoa");
        setLoading(false);
        return;
      }

      if (pdfCount === 0) {
        setError("Valittu kansio ei sisällä PDF-tiedostoja");
        setLoading(false);
        return;
      }

      setStats({ pdfCount, folderCount });
      setFolderName(folderHandle.name); // tallennetaan kansion nimi
      onFolderReady(folderHandle, { pdfCount, folderCount });
    } catch (e) {
      setError("Virhe: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setStats(null);
    setFolderName(null);
    setError(null);
    onFolderReady(null, null);
  };

  return (
    <div className="folder-input-container">
      <div className="folder-buttons">
        {!stats && <span>Aloita valitsemalla kansio<br /></span>}

        <div className="folder-buttons-container">
          <button className="btn-primary" onClick={handlePick}>Valitse kansio</button>
          {stats && <button className="btn-clear" onClick={handleClear}>Poista valinta</button>}
        </div>
      </div>

      {loading && <p className="loading-text">Lasketaan PDF-tiedostoja...</p>}

      {error && (
        <p className="error-text">
          {error}<br />
          <button className="btn-clear" onClick={handleClear}>OK</button>
        </p>
      )}

      {stats && (
        <div className="folder-stats">
          {folderName && <p>Kansio: {folderName}</p>}
          <p>Kansioita: {stats.folderCount}</p>
          <p>PDF-tiedostoja: {stats.pdfCount}</p>
        </div>
      )}
    </div>
  );
}
