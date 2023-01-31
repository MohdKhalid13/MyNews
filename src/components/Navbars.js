import React from 'react';
import {  NavLink } from 'react-router-dom';

function Search(){
  let x =  document.getElementById("search").value;
  let url =`https://www.google.com/search?q=${x}`;
  window.open(url,'_blank')
}

  const Navbars = (props) => {
        return(
        <div>
<nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <NavLink className="navbar-brand" >MyNews</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item"><NavLink to="/business" className="nav-link">Business</NavLink></li>
        <li className="nav-item"><NavLink to="/entertainment" className="nav-link">Entertainment</NavLink></li>
        <li className="nav-item"><NavLink to="/health" className="nav-link">Health</NavLink></li>
        <li className="nav-item"><NavLink to="/sports" className="nav-link">Sports</NavLink></li>
        <li className="nav-item"><NavLink to="/science" className="nav-link">Science</NavLink></li>
        <li className="nav-item"><NavLink to="/technology" className="nav-link">Technology</NavLink></li>
      </ul>

      <div className={`form-check form-switch me-5 ms-5 mt-1 text-${props.mode === 'dark' ? 'light' : 'dark'}`} id="form">
           <input className="form-check-input" onClick={props.toggle} type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
           <label className="form-check-label" id="name" htmlFor="flexSwitchCheckChecked">{`${props.mode === 'dark' ? 'Enable LightMode' : 'Enable DarkMode'}`}</label>
        </div> 

      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" id='search' aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit" onClick={Search}>Search</button>
      </form>
    </div>
  </div>
</nav>
        </div>
        )
    }


export default Navbars;