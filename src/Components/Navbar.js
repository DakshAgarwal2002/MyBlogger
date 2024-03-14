import React,{useContext} from 'react'
import AppContext from '../context/AppContext'
import { NavLink,useLocation,useNavigate } from 'react-router-dom'
const Navbar = () => {
    const context=useContext(AppContext)
    const {userName} = context;
    let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-secondary  fixed-top"  data-bs-theme="dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/" style={{"color":"white"}}>My Blogger</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==='/'?"active":""}`} style={{"color":"white"}} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==='/myposts'?"active":""}`} style={{"color":"white"}} aria-current="page" to="/myposts">My Posts</NavLink>
        </li>
      </ul>
    </div>
    <p className='text-center my-1' style={{color:"white",fontSize:"1.5rem"}}>{userName}</p>
  </div>
</nav>
  )
}

export default Navbar