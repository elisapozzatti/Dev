import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from '../context/ProfileContext';

function Header() {
    const { profile } = useProfile();
    console.log({profile});
    const [isLogged, setIsLogged] = useState(false);
    const [isFriendSection, setFriendSection] = useState(false);
    useEffect(() => {
        if(sessionStorage.getItem("token")) {
            setIsLogged(true)
            setFriendSection(true)
        } else {
            setIsLogged(false)
            setFriendSection(false)
        }
    }, [])

return (
<header>
<Link to="/" className="header-title">CARE HUB</Link>
<nav className="iconright">
<ul>
<li><Link to="/forum" className="forum">FORUM</Link></li>
<li><Link to="/chat" className="chatbot">CHAT</Link></li>
<li><Link to="/psicologi" className="notizie">PSICOLOGI</Link></li>
<li><Link to="/FriendsSection" className="notizie">AMICI</Link></li>


</ul>

</nav>
{isLogged ? (
    <div className="buttons-container">
    <Link to="/profiloutente">
    <img  class="immagineprofilo" src={profile?.avatar_url ? `http://localhost:3000${profile.avatar_url}` : "/profile.png"} alt="Profile"/>
    </Link>
    </div>
) : (
    <>
    <div className="buttons-container">
    <Link to="/login">
    <button className="button-access">ACCEDI</button>
    </Link>
    <Link to="/registrati">
    <button className="button-register">REGISTRATI</button>
    </Link>
    </div>
    </>
)}
</header>
);
}

export default Header;