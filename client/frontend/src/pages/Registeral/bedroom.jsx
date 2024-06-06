import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataRegister } from '../../data'; 
import '../../components/datatable/datatable.scss'
import Datatable from '../../components/datatable/Datatable'; // Import the GenericTable component
import { authService } from "../../services/authService";
import Spinner from '../../components/Spinner'
import BedRoomSee from './bedroomsee'
const BedRoom = () => {
  const [rooms, setRooms] = useState([]);
  const authToken = authService.getToken();

  const endpoint = "/api/v1/patient/room";

  const getData = async () => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if needed
        },
      });
      const { room } = response.data;
      setRooms(room);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRooms([]);
    }
  };

  const endpointById = (roomID) => `/api/v1/patient/room/${roomID}`;
  const endById = (roomID) => `/BedRoomView/view/${roomID}`;

 

  const handleDelete = async (roomID) => {
    try {
      await axios.delete(endpointById(roomID), {
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
      field: "patient",
      headerName: "Patient ID",
      width: 100,
    },
    {
      field: "allowedTime",
      headerName: "Allowed Time",
      width: 100,
    },
    {
      field: "dischargeTime",
      headerName: "Discharge Time",
      width: 150,
    },
    {
      field: "bedroomNumber",
      headerName: "Bedroom Number",
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
  const [open, setOpen] = useState(false)
  return (
    <section>
      <Navbar />
      <div className='fle'>
        <SideBar sidebarData={sideBarDataRegister } />
        <div className="users">
          <div className="info">
            <h1>Bed Rooms</h1>
            <button onClick={() => setOpen(true)}>Add Bed Room</button>
          </div>
          <Datatable
            title="Show data with Axios"
            rows={rooms}
            columns={columns}
            getData={getData}
            
          /> (
            <Spinner />
          )
        {open && <BedRoomSee setOpen={setOpen}/>}
        </div>
      </div>
    </section>
  );
};

export default BedRoom;
