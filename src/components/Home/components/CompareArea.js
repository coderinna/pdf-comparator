// --- components/CompareArea.jsx ---
export function CompareArea({ 
  pdfFile,
       pdfUrl,
       setPdfUrl,
   matchResult,
    onRecompare }) {

  return (
    <div className="compare-area-container">
      <h2 className="compare-title">Vertailu</h2>
      {pdfFile ? 
      <p className="selected-pdf">
        Valittu PDF: {pdfUrl}
        </p> 
        : <p className="no-pdf">Ei valittua PDF:ää</p>}

      {matchResult && 
      <div className="home_result"><p>
        Edellinen tulos:</p><p>
          {matchResult}</p></div>}

      <button className="btn-primary"
       onClick={onRecompare}>
        Hae sopiva kuva uudelleen</button>

    </div>
  );
}