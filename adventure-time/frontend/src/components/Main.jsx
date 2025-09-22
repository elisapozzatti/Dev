import "./Main.css";
import InfoBox from "./InfoBox";
import PercheHomepage from "./PercheHomepage.jsx";
import IntroHomepage from "./IntroHomepage.jsx";


export default function Main() {
  return (
    <div className="page-wrapper">
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Benvenuto su CARE-HUB</h1>
        <p className="hero-subtitle">
          La piattaforma dedicata al supporto della salute mentale: condividi, confronta e trova lo psicologo giusto per te.
        </p>
      </div>
      </div>
      <InfoBox></InfoBox>
      <IntroHomepage></IntroHomepage>
      <PercheHomepage></PercheHomepage>
    
   
    </div>
  );
}
