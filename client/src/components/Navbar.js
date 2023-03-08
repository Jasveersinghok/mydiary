import React from "react";
import { Link ,useLocation, useNavigate} from "react-router-dom";

function Navbar() {
  let location = useLocation()
  const history = useNavigate()
  const handleLogout= ()=>{
   localStorage.removeItem("token") 
   history("/login")
  }
  return (
    <>
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Mynotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link  to="/about"className={`nav-link ${location.pathname==="/about"?"active":""}`}>
                  about
                </Link>
              </li>
            </ul>
        {!localStorage.getItem("token")?<form className="d-flex">          
    <Link className="btn btn-primary mx-3" to="/login" >login</Link>
      <Link className="btn btn-primary" to="/Singup" >Singup</Link>
        </form>:<button className="btn btn-primary" onClick={handleLogout}>logout</button>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
