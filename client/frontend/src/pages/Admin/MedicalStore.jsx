import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../components/datatable/datatable.scss'
import MedicalAdd from './MedicalAdd'
import Spinner from '../../components/Spinner'
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarData } from '../../data';


const MedicalStore = () => {
  // 1 - Configure state hook
  const [medicines, setMedicines] = useState([]);

  // 2 - Function to fetch data with Axios
  const endpoint = "/api/v1/medicine";

  const getData = async () => {
    try {
      const response = await axios.get(endpoint);
      const { medicine } = response.data; // Extract the 'user' array from the response
      setMedicines(medicine);
      console.log(medicine)
    } catch (error) {
      console.error("Error fetching data:", error);
      setMedicines([]); // Set users to an empty array in case of an error
    }
  };
  const endpoints = (medicineId) => `/api/v1/medicine/getmedicine/${medicineId}`;



  useEffect(() => {
    getData();
  }, []);
  const handleDelete = async (medicineId) => {
    try {
      // Make an API call to delete the medicine by ID
      await axios.delete(endpoints(medicineId));
      // Refresh the data after deletion
      getData();
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };


  // 3 - Define columns
  const columns = [
    {
      field: "_id",
      headerName: "Id",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name",
      width: 100,
    },
    {
      field: "purchaseDate",
      headerName: "PurchaseDate",
      width: 100,
    },
   
    {
      field: "price", // Assuming this property exists in your user objects
      headerName: "Price",
      width: 140,
    },
    {
      field: "quantity", // Assuming this property exists in your user objects
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/MedicalStore/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to={`/MedicalStore/update/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            
            <div
        className="deleteButton"
        onClick={(e) => {
          e.stopPropagation(); // Stop the event propagation to prevent row selection
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
 const [open, setOpen] = React.useState(false)
  // 4 - Render the DataGrid
  return (
    <section>
    <Navbar/>
    <div className='fle'>
      <SideBar sidebarData={sideBarData} />
    <div className="users">
      <div className="info">
        <h1>Apparatus</h1>
        <button onClick={() => setOpen(true)}>Add New Apparatus</button>
      </div>
    <div className="datatable">

      {Array.isArray(medicines) && medicines.length > 0 ? (
        <DataGrid
        className="dataGrid"
          title={"Show data with Axios"}
          rows={medicines}
          columns={columns}

          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          slots={{toolbar:GridToolbar}}
          slotProps={{
            toolbar:{
              showQuickFilter: true,
              quickFilterProps: {debounceMs:500},
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableColumnFilter
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
          getRowId={(row) => row._id}
        />
      ) : (
        <Spinner />
      )}
    </div>{open && <MedicalAdd setOpen={setOpen}/>}</div></div></section>
  );
};

export default MedicalStore;
