/*import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../Context/AdminContext';

export default function Index() {
    const auth=useContext(AdminContext)
    const navigate=useNavigate();
    const onLogout=()=>{
        localStorage.clear('adminauthenticate');
        auth.setauthState({
            "loginstatus":false,
            "name":""
        })
        navigate("/admin/login")
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">e-Mantrana</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li className="nav-item ">
                        <span className="navbar-brand">{auth.authState.name}</span>
                    </li>
                        <li className="nav-item ">
                            <form className="form-inline">
                                <button type="button" className="btn btn-primary" onClick={()=>onLogout()}>Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}
*/