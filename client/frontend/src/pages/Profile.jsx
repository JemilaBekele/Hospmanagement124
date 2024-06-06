import  { useEffect, useState, useCallback } from "react";
import { authService } from "../services/authService";
import Navbar from '../components/navbar/Navbar';
import SideBar from '../components/sidebar/SideBar';
import { sideBarDatalab, sideBarDataNurse, sideBarDatadoctor, sideBarData, sideBarDataRegister } from '../data';
import axios from 'axios';

const Profile = () => {
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null);
  const userId = authService.getuserId();

  useEffect(() => {
    const role = authService.getUserRole();
    setUserRole(role);
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/auth/getuser/${userId}`);
      setUserData(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <section>
      <Navbar />
      <div className='flex'>
        <SideBar 
          sidebarData={
            userRole === 'nurse' ? sideBarDataNurse : 
            userRole === 'doctor' ? sideBarDatadoctor : 
            userRole === 'Laboratory' ? sideBarDatalab : 
            userRole === 'admin' ? sideBarData : 
            sideBarDataRegister
          } 
        />
        <div className="container mt-0 bg-light">
          <div className="d-flex align-items-center mb-3 pb-1">
            <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
            <span className="h1 fw-bold mb-0">Profile</span>
          </div>
          <div className="row mt-5">
            <div className="col-8">
              <ul className="list-group">
                {userData && (
                  <>
             
                    <li className="list-group-item">First Name : {userData.firstName}</li>
                    <li className="list-group-item">Last Name : {userData.lastName}</li>
                    <li className="list-group-item">Email : {userData.email}</li>
                    <li className="list-group-item">Role : {userData.role}</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;