import {useState} from 'react';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const artistiMusicali = [
    {
      nome: "Freddie Mercury",
      descrizione:
        "Cantante britannico e frontman dei Queen, famoso per la sua voce potente e il suo straordinario talento performativo. Nato a Zanzibar nel 1946, è considerato una delle più grandi voci della storia del rock. Ha scritto numerosi successi come 'Bohemian Rhapsody' e 'We Are The Champions'.",
      avatar: "https://robohash.org/freddie-mercury?set=set2&size=150x150",
    },
    {
      nome: "Bob Marley",
      descrizione:
        "Leggendario musicista reggae giamaicano che ha portato la musica e la cultura giamaicana in tutto il mondo. Nato nel 1945, Marley è conosciuto per brani iconici come 'No Woman, No Cry' e 'Redemption Song'. Il suo impatto va oltre la musica, essendo diventato un simbolo di pace e unità.",
      avatar: "https://robohash.org/bob-marley?set=set2&size=150x150",
    },
    {
      nome: "Madonna",
      descrizione:
        "Regina del pop e icona culturale americana che ha ridefinito i confini della musica pop dagli anni '80. Nota per la sua continua reinvenzione artistica e per successi come 'Like a Prayer' e 'Vogue'. Madonna ha venduto più di 300 milioni di dischi in tutto il mondo ed è una delle artiste più influenti della storia della musica.",
      avatar: "https://robohash.org/madonna?set=set2&size=150x150",
    },
    {
      nome: "David Bowie",
      descrizione:
        "Innovativo musicista britannico conosciuto per le sue trasformazioni stilistiche e la sua influenza su numerosi generi musicali. Soprannominato il 'Camaleonte del Rock', Bowie ha sperimentato dal glam rock all'elettronica. Tra i suoi brani più celebri figurano 'Space Oddity' e 'Heroes'.",
      avatar: "https://robohash.org/david-bowie?set=set2&size=150x150",
    },
    {
      nome: "Beyoncé",
      descrizione:
        "Cantante, attrice e imprenditrice americana considerata una delle più grandi artiste contemporanee. Ha iniziato la sua carriera con le Destiny's Child prima di intraprendere un'incredibile carriera da solista. Con album rivoluzionari come 'Lemonade' e performance iconiche, Beyoncé ha ridefinito cosa significa essere una pop star nel 21° secolo.",
      avatar: "https://robohash.org/beyonce?set=set2&size=150x150",
    },
  ];
const [artistaSelezionato, setArtistaSelezionato] = useState(null);
const [artistaPrecedente, setArtistaPrecedente] = useState(null);
const handleArtistaSelezionato = (artista) =>{
  if(artista===artistaPrecedente){
    setArtistaPrecedente(null);
    setArtistaSelezionato(null);
  }else{
    setArtistaPrecedente(artistaSelezionato);
    setArtistaSelezionato(artista);
  }
};
  return (
    <>
      <Header 
          artistiMusicali={artistiMusicali}
          handleArtistaSelezionato={handleArtistaSelezionato}
      />
      <Main 
          artistaSelezionato={artistaSelezionato}
          artistaPrecedente={artistaPrecedente}
      />
    </>
  );
}

export default App;
