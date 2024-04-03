import './App.css';
import React from 'react';
import { BrowserRouter ,Routes, Route, } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MyPosts from './pages/MyPosts';
import Notices from './pages/Notices';
import MyNotices from './pages/MyNotices';
import FAQPage from './pages/FAQPage';
import Settings from './pages/Settings';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      
        {/* Define your routes */}
        <Route path="/" Component={LoginPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path="/myposts" Component={MyPosts}/>
        <Route path="/allnotices" Component={Notices}/>
        <Route path="/mynotices" Component={MyNotices}/>
        <Route path="/faq" Component={FAQPage}/>
        <Route path="/settings" Component={Settings} />
    </Routes>
    </BrowserRouter>
    //<SignupPage></SignupPage>
  );

}

export default App;
