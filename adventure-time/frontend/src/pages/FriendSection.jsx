import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FriendSection.css';
import { useLoginReminder } from '../components/LoginReminder';
import { useProfile } from '../context/ProfileContext';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const getProfileImageUrl = (user) => {
    if (!user) return '/profile.png';
    
    // Se abbiamo già un URL completo
    if (user.profile_pic?.startsWith('http') || user.avatar_url?.startsWith('http')) {
      return user.profile_pic || user.avatar_url;
    }
    
    // Prendi il percorso dell'immagine
    const imagePath = user.profile_pic || user.avatar_url;
    
    // Se abbiamo un percorso relativo
    if (imagePath) {
      // Rimuovi eventuali slash doppi all'inizio
      const cleanPath = imagePath.replace(/^\/+/, '');
      return `http://localhost:3000/${cleanPath}`;
    }
    
    // Fallback se non c'è immagine
    return '/profile.png';
  };

const FriendsSection = () => {
    const { profile} = useProfile();
    const [activeTab, setActiveTab] = useState('following');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const showReminder = useLoginReminder();
    const navigate = useNavigate();



    // Estrai l'ID utente dal token
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setCurrentUserId(decodedToken.user_id);
            } catch (error) {
                
                console.error("Errore nel decodificare il token:", error);
            }
        }else{
            showReminder('Per accedere alla sezione delle amicizie devi effettuare il login');
        return;
        }
    }, []);

    useEffect(() => {
        const fetchFriendships = async () => {
            if (!currentUserId) return;
            
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/friend/friendships', {
                    headers: { 
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                
                const formattedUsers = response.data.map(user => ({
                    ...user,
                    // Assicurati che is_requester sia l'ID dell'utente che ha fatto la richiesta
                    is_requester: user.is_requester,
                    status: user.status || 'none'
                }));
            
                setUsers(formattedUsers);
            } catch (error) {
                handleApiError(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchFriendships();
    }, [activeTab, currentUserId]);

    const handleApiError = (error) => {
        console.error("Errore API:", error);
        
        if (error.response) {
            if (error.response.status === 401) {
                setError("Sessione scaduta, effettua di nuovo il login");
                sessionStorage.removeItem('token');
                setTimeout(() => window.location.href = '/login', 2000);
            } else {
                setError(error.response.data?.message || 'Errore del server');
            }
        } else if (error.request) {
            setError("Il server non ha risposto");
        } else {
            setError("Errore durante la richiesta");
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        
        if (!trimmedQuery) {
            setError('Inserisci un termine di ricerca');
            return;
        }
    
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`http://localhost:3000/api/friend/search`, {
                params: { query: trimmedQuery },
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                timeout: 10000
            });
    
            const formattedResults = response.data.map(user => ({
                id: user.id || user.user_id,
                username: user.username || user.user_name,
                profile_pic: user.profile_pic || user.avatar_url,
                avatar_url: user.profile_pic || user.avatar_url,
                status: user.status || 'none',
                is_requester: user.is_requester
              }));
            
    
            setSearchResults(formattedResults);
            
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    const manageFriendship = async (userId, action) => {
        if (!userId || !['request', 'accept', 'unfriend', 'reject'].includes(action)) {
            setError('Operazione non valida');
            return;
        }
    
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(
                'http://localhost:3000/api/friend/manage-friendship',
                { friend_id: userId, action },
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Aggiornamento stato
            const updateUserState = (prevUsers) => {
                if (data.shouldRemove) {
                    return prevUsers.filter(user => user.id !== userId);
                }
                return prevUsers.map(user => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            status: data.status,
                            is_requester: data.is_requester // <-- Ora è sempre l'ID
                        };
                    }
                    
                    return user;
                });
            };

            setUsers(updateUserState);
            setSearchResults(updateUserState);
            
        } catch (error) {
            setError(error.response?.data?.error || 'Errore del server');
        } finally {
            setLoading(false);
        }
    };

    const renderActionButton = (user) => {
        if (!currentUserId) return null;
    
        // Controlla se l'utente corrente è quello che ha fatto la richiesta
        const isCurrentUserRequester = user.is_requester === currentUserId;
    
        if (user.status === 'pending') {
            return isCurrentUserRequester
                ? <span className="pending-label">Richiesta inviata</span>
                : (
                    <div className="request-actions">
                        <button onClick={() => manageFriendship(user.id, 'accept')}>Accetta</button>
                        <button onClick={() => manageFriendship(user.id, 'reject')}>Rifiuta</button>
                    </div>
                );
        }
    
        if (user.status === 'accepted') {
            return <button onClick={() => manageFriendship(user.id, 'unfriend')}>Rimuovi</button>;
        }
    
        return <button onClick={() => manageFriendship(user.id, 'request')}>Aggiungi</button>;
    };

    return (
        <div className="friends-container">
            <div className="friends-header">
                <h2>Gestisci Amicizie</h2>
                <div className="tabs">
                    <button 
                        className={activeTab === 'following' ? 'active' : ''}
                        onClick={() => setActiveTab('following')}
                    >
                        Amici
                    </button>
                    <button 
                        className={activeTab === 'followers' ? 'active' : ''}
                        onClick={() => setActiveTab('followers')}
                    >
                        Richieste
                    </button>
                </div>
            </div>
            
            <div className="search-section">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Cerca nuovi utenti..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading || !searchQuery.trim()}>
                        {loading ? '...' : 'Cerca'}
                    </button>
                </form>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
                <div className="loading">Caricamento...</div>
            ) : searchResults.length > 0 ? (
                <div className="users-list">
                    <h3>Risultati della ricerca:</h3>
                    {searchResults.map(user => (
                        <div key={user.id} className="user-card">
                            <Link to={`/vediprofilo/${user.id}`}>
                            <img 
                                 src={getProfileImageUrl(user)} 
                                alt={user.username}
                                onError={(e) => e.target.src = '/profile.png'}
                            />
                            </Link>
                            <span>{user.username}</span>
                            {renderActionButton(user)}
                            
                        </div>
                    ))}
                </div>
            ) : (
                <div className="users-list">
                    <h3>{activeTab === 'following' ? 'I tuoi amici' : 'Richieste di amicizia'}</h3>
                    {users.length > 0 ? (
                       users .filter(user => 
                            activeTab === 'following' 
                                ? user.status === 'accepted' 
                                : user.status === 'pending'
                        )
                        .map(user => (
                            <div key={user.id} className="user-card">
                                <Link to={`/vediprofilo/${user.id}`}>
                                <img 
                                    src={getProfileImageUrl(user)} 
                                    alt={user.username}
                                    onError={(e) => e.target.src = '/profile.png'}
                                />
                                </Link>
                                <span>{user.username}</span>
                                
                                <div className="actions">
                                    {renderActionButton(user)}
                                    
                                </div>
                                
                            </div>
                        ))
                    ) : (
                        <p>Nessun utente trovato</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FriendsSection;