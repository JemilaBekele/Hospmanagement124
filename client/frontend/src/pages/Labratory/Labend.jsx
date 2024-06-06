import { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDatalab } from '../../data'; 
import '../../components/datatable/datatable.scss'
import { authService } from "../../services/authService";
// Import PatientsTable component
import { Link } from 'react-router-dom';

const LabEnd = () => {
  const [patients, setPatients] = useState([]);

  const authToken = authService.getToken();

  const labstatusEndpoint = "/api/v1/pay/labstatus/end";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(labstatusEndpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { labend } = response.data;
   
      setPatients(labend);
    } catch (error) {
      console.error("Error fetching lab status data:", error);
      setPatients([]);
    }
  };



  return (
    <section>
      <Navbar />
      <div className='fle'>
        <SideBar
          sidebarData={sideBarDatalab}
        />

        <div className="users">
        <div className="space-x-4">
            <Link to="/Labrarory/LabraroryDashboard" className="text-blue-500 hover:underline" onClick={() => getData("start")}>Start Page</Link>
            <Link to="/Labrarory/Labraroryprogress" className="text-blue-500 hover:underline" onClick={() => getData("progress")}>Progress Page</Link>
            <Link to="/Labrarory/Labraroryfinish" className="text-blue-500 hover:underline" onClick={() => getData("end")}>End Page</Link>
          </div>
          <div className="info">
            <h1> Labrarory Data</h1>
            <table className='w-full border-separate border-spacing-2'>
              <thead>
                <tr>
                  <th className='border border-slate-700 rounded-md text-center'>No</th>
                  <th className='border border-slate-700 rounded-md text-center'>First Name</th>
                  <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Last Name</th>
                  <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Age</th>
                  <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Phone Number</th>
                 
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={patient._id} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{patient.firstName}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.lastName}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.age}</td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.phoneNumber}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
           
         
        </div>
      </div>
    </section>
  );
};

export default LabEnd;
