import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './forms/Login';
import Register from './forms/Register';
// import Chat from './Chat'; 
import './App.css';

function App() {
    return (
        <Router>
            <div>
                {/* You can add a header or navigation here if you want */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* <Route path="/chat" element={<Chat />} />  */}
                    {/* Add other routes here */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;