import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import ForumPost from "./pages/ForumPost.jsx";
import Psicologi from "./pages/Psicologi.jsx";
import HomePage from "./pages/HomePage.jsx"; 
import Registrati from "./pages/Registrati.jsx"; 
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import Login from './pages/Login.jsx';
import Categorie from './pages/categorie.jsx';
import Commenti from './pages/ChatPage.jsx';
import Messaggi from './pages/messaggi.jsx';
import Profiloutente from './pages/profiloutente.jsx';
import Reazioni from './pages/reazioni.jsx';
import Ricerca from './pages/ricerca.jsx';
import Vediprofilo from './pages/vediprofilo.jsx';
import ForumHomePage from "./pages/ForumHomePage.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import FriendsSection from "./pages/FriendSection.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { LoginReminderProvider } from "./components/LoginReminder.jsx";


function App() {
  return (
    <SocketProvider>
      
    <Router>
    <LoginReminderProvider>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="forum" element={<ForumHomePage />} />
          <Route path="psicologi" element={<Psicologi />} />
          <Route path="post/:post_id" element={<ForumPost />} />
          <Route path="registrati" element={<Registrati />} /> 
          <Route path="login" element={<Login />} /> 
          <Route path="categorie" element={<Categorie />} /> 
          <Route path="/categorie/:categorie_id" element={<ForumHomePage />} />
          <Route path="chat" element={<ChatPage />} />
<Route path="chat/:userId" element={<ChatPage />} />
          <Route path="messaggi" element={<Messaggi />} /> 
          <Route path="profiloutente" element={<Profiloutente />} /> 
          <Route path="reazioni" element={<Reazioni />} />
          <Route path="ricerca" element={<Ricerca />} /> 
          <Route path="vediprofilo/:id" element={<Vediprofilo />} />  
          <Route path="CreatePost" element ={<CreatePost/>} />
          <Route path="FriendsSection" element ={<FriendsSection/>} />
          <Route index element={<HomePage />} />
        </Route> 
      </Routes>
      </LoginReminderProvider>
    </Router>
    
    </SocketProvider>
  );
}

export default App;