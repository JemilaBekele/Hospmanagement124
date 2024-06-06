import { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataRegister, sideBarDataNurse } from '../../data'; 
import '../../components/datatable/datatable.scss'
import { authService } from "../../services/authService";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';

const PaymentConfirm = () => {
  const [patients, setPatients] = useState([]);
  const authToken = authService.getToken();
  const userRole = authService.getUserRole();
  const endpoint = "/api/v1/pay/paymentconfirm";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if needed
        },
      });
      const { unpaidPatients } = response.data;
      console.log(unpaidPatients);
      setPatients(unpaidPatients);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPatients([]);
    }
  };

  return (
    <section>
      <Navbar />
      <div className='fle'>
        <SideBar
          sidebarData={userRole === 'nurse' ? sideBarDataNurse : sideBarDataRegister}
        />

        <div className="users">
          <div className="info">
            <h1>Patient Payment Information</h1>
            <table className='w-full border-separate border-spacing-2'>
              <thead>
                <tr>
                  <th className='border border-slate-700 rounded-md text-center'>No</th>
                  <th className='border border-slate-700 rounded-md text-center'>First Name</th>
                  <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Last Name</th>
                  <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Age</th>
                  <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Phone Number</th>
                  <th className='border border-slate-700 rounded-md text-center'>View</th>
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
                    <td className='border border-slate-700 rounded-md text-center'>
                      <div className='flex justify-center gap-x-4'>
                        <Link to={`/Patientapprove/valid/${patient._id}`}>
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
    </section>
  );
};

export default PaymentConfirm;
