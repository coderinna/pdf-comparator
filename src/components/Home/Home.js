import { useState } from "react";
import "./Home.css";

import {PdfInput} from "./components/PdfInput"
import {FolderInput} from "./components/FolderInput"
import {CompareArea} from "./components/CompareArea"
import {CompareStart} from "./components/CompareStart.js"

export default function App() {

  const [folderHandle, setFolderHandle] = useState(null);
  const [folderStats, setFolderStats] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [matchResult, setMatchResult] = useState(null);

  const runCompare = () => setMatchResult("Löytyi vastaava PDF-kuva!");

  return (
    <div className="app-container">
      <h1 className="app-title">PDF Vertailutyökalu</h1>

<div className="section section-one">
  <h2 className="section-title">Vaihe 1: Valitse kansio</h2>
  <div className="section-content">
  <FolderInput
    onFolderReady={(handle, stats) => {
      setFolderHandle(handle);
      setFolderStats(stats);
    }}
  />
</div>
</div>


      {folderHandle &&
<div className="section two">
  <h2 className="section-title">Vaihe 2: Valitse PDF-tiedosto</h2>
  <div className="section-content">
       <PdfInput 
       pdfFile={pdfFile}
       setPdfFile={setPdfFile}
       pdfUrl={pdfUrl}
      setPdfUrl={setPdfUrl}
       onValidated={(file) => setPdfFile(file)}
        />
        </div>
        </div>
        }

              {pdfUrl &&
       <CompareStart
          />}

      {matchResult &&
<div className="section three">
       <CompareArea 
       pdfFile={pdfFile}
       pdfUrl={pdfUrl}
      setPdfUrl={setPdfUrl}
        matchResult={matchResult}
         onRecompare={runCompare}
          /></div>
          }

    </div>
  );
}

