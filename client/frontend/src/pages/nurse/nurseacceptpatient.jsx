import  { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataNurse , sideBarDatadoctor} from '../../data';
import '../../components/datatable/datatable.scss';
import { authService } from "../../services/authService";
import {AiOutlineEdit} from 'react-icons/ai'
const NurseAcceptPatient = () => {
  const [patients, setPatients] = useState([]);
  const userRole = authService.getUserRole();

  const authToken = authService.getToken();
  const endpoint = "/api/v1/patient/active/";

  useEffect(() => {
    getData();
  }, []); // Fetch data on component mount

  const getData = async () => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if needed
        },
      });
      const { patient } = response.data;
      setPatients(patient);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPatients([]);
    }
  };

  return (
    <section>
      <Navbar />
      <div className='flex'>
      <SideBar sidebarData={userRole === 'nurse' ? sideBarDataNurse :sideBarDatadoctor } />
        <div className='p-4'>
          <div className='flex justify-center items-center gap-x-4'>
            <div>
              <h1 className='flex flex-col justify-between items-center text-3xl my-8'>
                Patient Information
              </h1>
              <table className='w-full border-separate border-spacing-2'>
                <thead>
                  <tr>
                    <th className='border border-slate-700 rounded-md text-center'>No</th>
                    <th className='border border-slate-700 rounded-md text-center'>First Name</th>
                    <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Last Name</th>
                    <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Age</th>
                    <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Gender</th>
                    <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Address</th>
                    <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Phone Number</th>
                    <th className='border border-slate-700 rounded-md text-center max-md:hidden'>View</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((user, index) => (
                    <tr key={user._id} className='h-8'>
                      <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                      <td className='border border-slate-700 rounded-md text-center'>{user.firstName}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{user.lastName}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{user.age}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{user.gender}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{user.address}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{user.phoneNumber}</td>
                      <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/Patientview/view/${user._id}`}>
                    <AiOutlineEdit className='text-2xl text-green-800' />
                  </Link>
                  
                </div>
              </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NurseAcceptPatient;
