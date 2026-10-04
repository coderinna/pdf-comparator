import { useState } from "react";
import "./CSS/Help.css";

export default function App() {
  return (
    <div className="Help_app-container">
      <div className="Help_card">
        <h2 className="Help_title">Ohjeet työkalun käyttöön</h2>
        <p className="Help_description">
          Näiden ohjeiden avulla voit suorittaa PDF-analyysin helposti vaihe vaiheelta.
        </p>

        <div className="Help_steps">

<div className="Help_step">
  <div className="Help_stepNumber">1</div>
  <div className="Help_stepBody">
    <div className="Help_label">Kansion valinta</div>

    <div className="Help_hint">
      Valitse kansio, jossa PDF-tiedostosi sijaitsevat.
    </div>
<br></br>
    <div className="Help_hint">
      <strong>Error jos:</strong><br />
      – Järjestelmä kansioita (esim. C-asema)<br />
      – Kansiota sisältää yli 100 alikansiota<br />
      – Kansiosta löytyy yli 100 PDF-tiedostoa
    </div>
  </div>
</div>

<div className="Help_step">
  <div className="Help_stepNumber">2</div>
  <div className="Help_stepBody">
    <div className="Help_label">PDF-tiedoston valinta</div>

    <div className="Help_hint">
      Valitse analysoitava PDF-tiedosto. Varmista, että tiedosto on oikeassa muodossa.
    </div>

<br></br>
    <div className="Help_hint">
      <strong>Error jos:</strong><br />
      – Tiedosto ei ole PDF-muotoinen<br />
      – PDF sisältää yli 2 sivua
    </div>
  </div>
</div>


          <div className="Help_step">
            <div className="Help_stepNumber">3</div>
            <div className="Help_stepBody">
              <div className="Help_label">Tuloksen haku</div>
              <div className="Help_hint">
                Suorita haku ja odota, että analyysi valmistuu.
              </div>
            </div>
          </div>

          <div className="Help_step">
            <div className="Help_stepNumber">4</div>
            <div className="Help_stepBody">
              <div className="Help_label">Hae uudestaan</div>
              <div className="Help_hint">
                Voit aloittaa uuden haun valitsemalla uuden tiedoston tai kansion.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
