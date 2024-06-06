import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { authService } from "../../services/authService";
import { sideBarDataNurse } from '../../data';
import NurseUpdate from './nurseupdate';
import '../Registeral/PatientRegistrationForm.scss'
const NurseView = () => {
  const { medicalId } = useParams();
  const [medicalData, setMedicalData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const authToken = authService.getToken();

  const fetchPatientData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/nurse/medicine/get/${medicalId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if needed
        },
      });
      setMedicalData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }, [authToken, medicalId]);

  useEffect(() => {
    fetchPatientData();
  }, [fetchPatientData]);

  const handleUpdateSuccess = () => {
    // Callback function to handle update success
    // You might want to refetch patient data or perform other actions
    // For simplicity, you can refetch the patient data
    fetchPatientData();
    setShowUpdateForm(false); // Hide the update form after a successful update
  };

  if (!medicalData) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Navbar />
      <div className='fle'>
        <SideBar sidebarData={sideBarDataNurse} />
        <div>
          <div className="single">
            <div className="view">
              <div className="info">
                <div className="topInfo">
                  <h1>Patient Details</h1>
                  <button onClick={() => setShowUpdateForm(true)}>Update</button>
                </div>
                <div className="details">
                  {Object.entries(medicalData.medical).map(([key, value]) => (
                    <div key={key} className="item">
                      <p className="itemTitle">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </p>
                      <p className="itemValue">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {showUpdateForm && (
              <div className="updateForm">
                <NurseUpdate
                  medicalId={medicalId}
                  authToken={authToken}
                  onUpdateSuccess={handleUpdateSuccess}
                  setShowUpdateForm= {setShowUpdateForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NurseView;
