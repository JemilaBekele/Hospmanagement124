import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../components/datatable/datatable.scss';
import { authService } from "../../services/authService";
import { AiOutlineEdit } from 'react-icons/ai';

const DoctorAcceptPatient = () => {
  const [patients, setPatients] = useState([]);
 
  const authToken = authService.getToken();
  const endpoint = "/api/v1/patient/fordoc";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      console.log(response.data)
      setPatients(response.data.patients); // Update here to access the 'patients' array
    } catch (error) {
      console.error("Error fetching data:", error);
      setPatients([]);
    }
  };

  return (
   
        <div className='p-1'>
          <div className='flex justify-center items-center gap-x-4'>
            <div>
              <h1 className='flex flex-col justify-between items-center text-3xl my-8'>
              Patient Data
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
                    <th className='border border-slate-700 rounded-md text-center'>View</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => ( // Changed 'user' to 'patient' for better clarity
                    <tr key={patient._id} className='h-8'>
                      <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                      <td className='border border-slate-700 rounded-md text-center'>{patient.firstName}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.lastName}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.age}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.gender}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.address}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.phoneNumber}</td>
                     
                      <td className='border border-slate-700 rounded-md text-center'>
                        <div className='flex justify-center gap-x-4'>
                          <Link to={`/Patientview/view/${patient._id}`}>
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
      
  );
};

export default DoctorAcceptPatient;
