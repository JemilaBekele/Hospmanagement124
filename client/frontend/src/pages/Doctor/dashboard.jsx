
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDatadoctor } from '../../data'; 
import '../../components/datatable/datatable.scss'
import PatientCount from '../../components/Patientcount';
import SearchBar from '../../components/search/searchlist';
import DoctorAcceptPatient from '../Doctor/DoctorAcceptPatient'
const DoctorDashboard = () => {
 
 


  return (
    <section>
      <Navbar />
      <div className='fle'>
        <SideBar sidebarData={sideBarDatadoctor } />
        <div className="users">
          <div className="info">
          <SearchBar/>
            <PatientCount />     
          </div>
     
          <div>
            <DoctorAcceptPatient/>
          </div>



         
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboard;
