import React, { useState } from "react";
import "./Psicologi.css";

const psicologi = [
  {
    nome: "Dr. Mario Rossi",
    laurea: "Laurea in Psicologia Clinica",
    email: "mario.rossi@carehub.it",
    telefono: "123-456-7890",
    specializzazione: "Ansia, Stress, Autostima, Depressione",
    disponibilita: [
      "2025-04-02 09:00",
      "2025-04-02 10:00",
      "2025-04-02 11:00",
      "2025-04-02 14:00",
      "2025-04-02 15:00",
      "2025-04-02 16:00",
      "2025-04-03 09:00",
      "2025-04-03 10:00",
      "2025-04-03 11:00",
    ],
  },
  {
    nome: "Dott.ssa Anna Bianchi",
    laurea: "Laurea in Psicologia e Psicoterapia",
    email: "anna.bianchi@carehub.it",
    telefono: "098-765-4321",
    specializzazione: "Depressione, Disturbi dell'umore, Disturbi d'Ansia",
    disponibilita: [
      "2025-04-02 09:00",
      "2025-04-02 11:00",
      "2025-04-02 13:00",
      "2025-04-02 15:00",
      "2025-04-03 10:00",
      "2025-04-03 12:00",
      "2025-04-03 14:00",
    ],
  },
  {
    nome: "Dr. Luca Campi",
    laurea: "Laurea in Psicologia Cognitiva",
    email: "luca.campi@carehub.it",
    telefono: "555-123-4567",
    specializzazione: "Stress, Ansia Sociale, Disturbi ossessivo-compulsivi, Fobie",
    disponibilita: [
      "2025-04-02 09:00",
      "2025-04-02 10:00",
      "2025-04-02 11:00",
      "2025-04-02 14:00",
      "2025-04-02 16:00",
      "2025-04-03 09:00",
      "2025-04-03 11:00",
      "2025-04-03 15:00",
    ],
  },
  {
    nome: "Dott.ssa Francesca Stella",
    laurea: "Laurea in Psicologia del Lavoro e delle Organizzazioni",
    email: "francesca.stella@carehub.it",
    telefono: "654-321-9870",
    specializzazione: "Problemi familiari, Stress lavoro-correlato, Difficoltà comunicative, Mediazione familiare",
    disponibilita: [
      "2025-04-02 09:00",
      "2025-04-02 10:00",
      "2025-04-02 13:00",
      "2025-04-02 15:00",
      "2025-04-03 10:00",
      "2025-04-03 14:00",
      "2025-04-03 16:00",
    ],
  },
];

function Psicologi() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");

  const handlePrenota = (psicologo) => {
    setSelectedPsychologist(psicologo);
    setShowModal(true);
  };

  const handleConfermaPrenotazione = () => {
    if (selectedSlot) {
      const subject = `Prenotazione con ${selectedPsychologist.nome}`;
      const body = `Salve,\n\nDesidero confermare la prenotazione con ${selectedPsychologist.nome} per il giorno ${selectedSlot}.\n\nCordiali saluti.`;
      
      window.location.href = `mailto:${selectedPsychologist.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Update availability
      setSelectedPsychologist((prev) => ({
        ...prev,
        disponibilita: prev.disponibilita.filter((slot) => slot !== selectedSlot),
      }));
      setShowModal(false);
      setSelectedSlot("");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPsychologist(null);
  };

  return (
    <div className="psicologi-container">
      <h2>Contatta i nostri psicologi</h2>
      <p>Scegli lo specialista più adatto alle tue esigenze e prenota una seduta gratuita.</p>

      <div className="psicologi-grid">
        {psicologi.map((psicologo, index) => (
          <div className="psicologo-card" key={index}>
            <h3>{psicologo.nome}</h3>
            <p><strong>Laurea:</strong> {psicologo.laurea}</p>
            <p><strong>Specializzazione:</strong> {psicologo.specializzazione}</p>
            <p><strong>Email:</strong> {psicologo.email}</p>
            <p><strong>Telefono:</strong> {psicologo.telefono}</p>
            <button onClick={() => handlePrenota(psicologo)}>Prenota una seduta</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Prenotazione per {selectedPsychologist.nome}</h2>
            {selectedPsychologist.disponibilita.length > 0 ? (
              <>
                <label htmlFor="slot">Seleziona un orario disponibile:</label>
                <select
                  id="slot"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                >
                  <option value="">-- Seleziona --</option>
                  {selectedPsychologist.disponibilita.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                
                <div style={{ marginTop: "20px" }}></div>

                <div className="modal-buttons">
                  <button className="annulla" onClick={closeModal}>Annulla</button>
                  <button onClick={handleConfermaPrenotazione} disabled={!selectedSlot}>Conferma</button>
                </div>
              </>
            ) : (
              <p>Non ci sono orari disponibili.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Psicologi;