import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataNurse } from '../../data'; 
import '../../components/datatable/datatable.scss'
import Datatable from '../../components/datatable/Datatable'; // Import the GenericTable component
import { authService } from "../../services/authService";

const NurseDashboard = () => {
  const [medical, setMedical] = useState([]);
  const authToken = authService.getToken();

  const endpoint = "/api/v1/nurse/medicine";

  const getData = async () => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if needed
        },
      });
      const { medical } = response.data;
      setMedical(medical);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMedical([]);
    }
  };

  const endpointById = (medicalId) => `/api/v1/nurse/medicine/get/${medicalId}`;
  const endById = (medicalId) => `/nurse/NurseView/${medicalId}`;

 

  const handleDelete = async (medicalId) => {
    try {
      await axios.delete(endpointById(medicalId), {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if needed
        },
      });
      getData();
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
      field: "bloodType",
      headerName: "Blood Type",
      width: 100,
    },
    {
      field: "allergies",
      headerName: "Allergies",
      width: 100,
    },
    {
      field: "medicalConditions",
      headerName: "Medical Conditions",
      width: 150,
    },
    {
      field: "weight",
      headerName: "Weight",
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
              View
            </Link>
            <div
              className="deleteButton"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
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
        <SideBar sidebarData={sideBarDataNurse } />
        <div className="users">
          <div className="info">
            <h1 >Patient Health Information</h1>
            
          </div>
          <Datatable
            title="Show data with Axios"
            rows={medical}
            columns={columns}
            getData={getData}
            
          />
        </div>
      </div>
    </section>
  );
};

export default NurseDashboard;
