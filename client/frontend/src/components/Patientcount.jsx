import  { useState, useEffect } from 'react';
import axios from 'axios';
import { authService } from "../services/authService";
const PatientCount = () => {
  const [patients, setPatients] = useState([]);
  const authToken = authService.getToken();
  useEffect(() => {
    const fetchPatients = async () => {
        try {
          const response = await axios.get('/api/v1/patient/', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const responseData = response.data;
          if (responseData && Array.isArray(responseData.patient)) {
            setPatients(responseData.patient);
          } else {
            console.error('Invalid response data:', responseData);
          }
        } catch (error) {
          console.error('Error fetching patients:', error.response?.data?.error || error.message);
        }
      };
      
      

    fetchPatients();
  }, [authToken]);

  // Filter active patients
  const activePatients = patients.filter(patient => patient.Status === 'Active');

  return (
    <div>
         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="mx-4 my-8 p-6 bg-white rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Data of Patients</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-200 rounded-lg">
                <p className="text-xl font-semibold">Total Patients:</p>
                <p className="text-2xl">{patients.length}</p>
              </div>
              <div className="p-4 bg-green-200 rounded-lg">
                <p className="text-xl font-semibold">Active Patients:</p>
                <p className="text-2xl">{activePatients.length}</p>
              </div>
             
            </div>
          </div>
        </main>
    </div>
  );
};

export default PatientCount;
