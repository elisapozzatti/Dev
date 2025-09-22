function Cards(props){
    return(
                <div class="card">
                    <img class="cane" src={props.img}></img>
                    <h2 class="breed">{props.breed}</h2>
                    <h3 class="descrizione">{props.description}</h3>
                </div>
    );
}
export default Cards;