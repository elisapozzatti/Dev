import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = ({ currentUserId, onUserSelect }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/friend/friendships/accepted', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const formattedFriends = response.data.map(friend => ({
          id: friend.id,
          name: friend.username,
          profile_pic: friend.profile_pic || '/default-avatar.png',
          isOnline: friend.isOnline || false
        }));

        setFriends(formattedFriends);
      } catch (err) {
        console.error('Errore nel caricamento degli amici:', err);
        setError('Impossibile caricare la lista amici');
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [currentUserId]);

  if (loading) return <div>Caricamento contatti...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-list">
      <h3>Contatti</h3>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            <div 
              className="user-item"
              onClick={() => onUserSelect(friend)}
              style={{cursor: 'pointer'}}
            >
              <img
                src={`http://localhost:3000${friend?.profile_pic}` || "/profile.png"}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null; // evita loop infinito
                  e.target.src = "/profile.png";
                }}
              />
              <span>{friend.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;