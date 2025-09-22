import logo from '../assets/img/paw-logo.png'

function Header(){
    return (
        <header>
                <img class="img" src={logo}/>
                <h2 class="voci margine">Pawsome dogs</h2>
                <p class="voci">Home</p>
                <p class="voci">About</p>
                <p class="voci">Contatti</p>
        </header>
    )
}
export default Header;