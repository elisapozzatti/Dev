function Main(props){
        return(
        <main>
            {props.artistaSelezionato!==null &&(
                <div>
                    <img src={props.artistaSelezionato.avatar}></img>
                    <h1>{props.artistaSelezionato.nome}</h1>
                    <h3>{props.artistaSelezionato.descrizione}</h3>
                </div>
            )}
        </main>
    );
}
export default Main;