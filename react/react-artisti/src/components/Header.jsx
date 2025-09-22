function Header(props){
    return(
        <header>
            <section class="containerButton">
            {props.artistiMusicali.map((artista)=>(
                <button key={artista.nome} onClick={()=>props.handleArtistaSelezionato(artista)}>{artista.nome}</button>
            ))}
            </section>
        </header>
    );
}
export default Header;