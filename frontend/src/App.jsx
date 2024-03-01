import './App.css';
import React from 'react';
import { BrowserRouter ,Routes, Route, } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import NavbarComponent from './components/NavbarComponent';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
        {/* Define your routes */}
        <Route path="/" Component={LoginPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/dashboard" Component={NavbarComponent}/>
    </Routes>
    </BrowserRouter>
    //<SignupPage></SignupPage>
  );

}

export default App;
