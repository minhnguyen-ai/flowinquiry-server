import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route, Link} from 'react-router-dom';

import AddUser from './modules/user-management/AddUser';
import UserList from "./modules/user-management/UserList";
import Profile from "./modules/user-management/Profile";

const App: React.FC = () => {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/users" className="navbar-brand">
            Users
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<UserList/>}/>
            <Route path="/users" element={<UserList/>}/>
            <Route path="/add" element={<AddUser/>}/>
            <Route path="/users/:id" element={<Profile/>}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
