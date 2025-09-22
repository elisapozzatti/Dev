import React from "react";
import "./PercheHomepage.css";

const PercheHomepage = () => {
  return (
    <section className="contenitore-perche">
      {/* Immagine */}
      <div className="image-container">
      <img src="/personaseduta.png" alt="Persona seduta" />
      </div>

      {/* Testo */}
      <div className="text-contenitore-perche">
        <h2>Perché <span className="highlight">Care Hub</span></h2>
        <ul>
        <li>🟢 <strong>Una community di supporto</strong>: Un forum dove puoi condividere esperienze, ricevere consigli e sentirti meno solo.</li>
          <li>🟢 <strong>Categorie per ogni esigenza</strong>: Ansia, stress, depressione e molto altro. Trova subito discussioni adatte a te.</li>
          <li>🟢 <strong>Commenti e interazioni</strong>: Puoi rispondere ai post, offrire supporto e creare legami con persone che vivono situazioni simili.</li>
          <li>🟢 <strong>Crea il tuo profilo</strong>: Personalizza il tuo account e inizia a partecipare al forum con un’identità unica.</li>
          <li>🟢 <strong>Risorse per il benessere</strong>: Oltre al forum, troverai articoli, guide e consigli su come migliorare la tua salute mentale.</li>
          <li>🟢 <strong>Uno spazio sicuro</strong>: La nostra piattaforma è moderata per garantire un ambiente rispettoso e di supporto.</li>
        </ul>
      </div>
    </section>
  );
};

export default PercheHomepage;
