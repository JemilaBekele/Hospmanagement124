import { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDatalab } from '../../data'; 
import '../../components/datatable/datatable.scss'
import { authService } from "../../services/authService";
import PatientsTable from '../../components/datatable/PatientsTable'; // Import PatientsTable component
import { Link } from 'react-router-dom';
import SearchBar from '../../components/search/searchlist';
const LabStart = () => {
  const [patients, setPatients] = useState([]);

  const authToken = authService.getToken();

  const labstatusEndpoint = "/api/v1/pay/labstatus/start";

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
      const { labstart } = response.data;
      console.log(labstart);
      setPatients(labstart);
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
          <SearchBar/>
            <h1>Labrarory Data</h1>
            <PatientsTable patients={patients} linkPrefix="/Patientview/view"   updateData={{ LabStatus: 'Progress' }}/>
          </div>
          
           
         
        </div>
      </div>
    </section>
  );
};

export default LabStart;
