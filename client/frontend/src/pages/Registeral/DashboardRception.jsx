import { useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataRegister, sideBarDataNurse } from '../../data'; 
import '../../components/datatable/datatable.scss'
import Datatable from '../../components/datatable/Datatable'; // Import the GenericTable component
import { authService } from "../../services/authService";
import PatientCount from '../../components/Patientcount';
const DashboardRception = () => {
  const [patients, setPatients] = useState([]);
  const authToken = authService.getToken();
  const userRole = authService.getUserRole();
  const endpoint = "/api/v1/patient/";
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

  const endpointById = (patientId) => `/api/v1/patient/get/${patientId}`;
  const endById = (patientId) => `/Patientview/view/${patientId}`;
  const endByIdup = (patientId) => `/PatientUpdateForm/view/${patientId}`
  const handleDelete = async (patientId) => {
    try {
      await axios.delete(endpointById(patientId), {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if needed
        },
      });
      getData(); // Fetch updated patient data after deletion
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };
  

  const columns = [
    {
      field: "_id",
      headerName: "Id",
      width: 100,
    },
    {
      field: "firstName",
      headerName: "FirstName",
      width: 100,
    },
    {
      field: "lastName",
      headerName: "LastName",
      width: 100,
    },
    
    {
      field: "age",
      headerName: "Age",
      width: 140,
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
 <Link to={endById(params.row._id)} className="viewButton">
            <div className="viewButton" 
              >View</div>
            
            </Link>
            <Link to={endByIdup(params.row._id)} className="viewButton">
            <div className="viewButton" 
              >Update</div>
            
            </Link>
                     
            <div
              className="deleteButton"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(params.row._id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <section>
      <Navbar />
      <div className='fle'>
      <SideBar
   sidebarData={userRole === 'nurse' ? sideBarDataNurse : sideBarDataRegister}
/>

        <div className="users">
          <div className="info">
            <h1 >Patient Information</h1>
            <PatientCount />
          </div>
          <Datatable
            title="Show data with Axios"
            rows={patients}
            columns={columns}
            getData={getData}
            
          />
           
        </div>
      </div>
    </section>
  );
};

export default DashboardRception;
