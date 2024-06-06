import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [email, setEmail] = useState();
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const role = authService.getUserRole();
    setUserRole(role);

    const email = authService.getUserEmail();
    setEmail(email);
  }, []);

  const logout = () => {
    authService.logOut();
    navigate('/');
  };

  return (
    <>
      <div className="container mt-5 bg-light">
        <div className="row mt-5">
          <div className="col-8">
            <ul className="list-group">
              <li className="list-group-item">Email : {email}</li>
              <li className="list-group-item">Role : {userRole}</li>
            </ul>

            <div className="bg-light">
            {(userRole === 'admin' || userRole === 'registrar' || userRole === 'nurse' || userRole === 'doctor' || userRole === 'Labratory') && (
  <button onClick={() => {
    if (userRole === 'admin') {
      navigate('/dashboard');
    } else if (userRole === 'registrar') {
      navigate('/DashboardRception');
    } else if (userRole === 'nurse') {
      // Add the nurse panel navigation here
      navigate('/nurse/NurseDashboard');
    }else if (userRole === 'doctor') {
      // Add the doctor panel navigation here
      navigate('/Doctor/DoctorDashboard');
    }else if (userRole === 'Labratory') {
      // Add the Labratory panel navigation here
      navigate('/Labrarory/LabraroryDashboard');
    }

  }}>
    {userRole === 'admin' ? 'ADMIN PANEL' : (userRole === 'registrar' ? 'RECEPTION PANEL' : (userRole === 'nurse' ? 'NURSE PANEL' : (userRole === 'doctor' ? 'Doctor PANEL' : 'Labrarory PANEL')))}
  </button>
)}


              <div className="mt-5 text-center">
                <button className="btn btn-danger" onClick={() => logout()}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
