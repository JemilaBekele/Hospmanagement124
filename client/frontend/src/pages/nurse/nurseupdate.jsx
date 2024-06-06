import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Textarea, Label, TextInput } from "flowbite-react";
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataNurse } from '../../data';
import { authService } from "../../services/authService";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const UpdateMedicalDataForm = () => {
  const navigate = useNavigate();
  const { patientID, medicalDataID } = useParams();
  const authToken = authService.getToken();
  const [doctors, setDoctors] = useState([]);
  const role = "doctor";
  // State to store medical data
  const [medicalData, setMedicalData] = useState({
    bloodType: '',
    allergies: '',
    medicalConditions: '',
    weight: '',
    assigneddoctorTo: ''
  });
  useEffect(() => {
  

    axios
      .get('/api/v1/auth/getuser')
      .then((response) => {
        console.log("API Response:", response);

        if (response.data.user) {
          console.log("User Object:", response.data.user);

          // Filter users based on the required role
          const filteredUsers = response.data.user.filter(user => user.role === role);

          setDoctors(filteredUsers);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      
  }, []);
  // Fetch existing medical data when component mounts
  useEffect(() => {
    const fetchMedicalData = async () => {
      try {
        const response = await axios.get(`/api/v1/nurse/medicine/${patientID}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const responseData = response.data;
        if (responseData && responseData.data && responseData.data.medicalData && responseData.data.medicalData.length > 0) {
          // Update state with fetched medical data (take the first item if there are multiple)
          setMedicalData(responseData.data.medicalData[0]);
        } else {
          console.error('Medical data not found:', responseData);
        }
      } catch (error) {
        console.error('Error fetching medical data:', error.response?.data?.error || error.message);
      }
    };
  
    fetchMedicalData();
  }, [patientID, medicalDataID, authToken]);
  

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicalData({ ...medicalData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/v1/nurse/medicine/${patientID}/update/${medicalDataID}`, medicalData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Response:', response.data);
      toast.success('Update successful!');
      navigate(`/Patientview/view/${patientID}`);
    } catch (error) {
      console.error('Error updating medical data:', error.response?.data?.error || error.message);
    }
  };

  return (
    <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarDataNurse} />
        <div className="px-3 my-12" style={{ textAlign: 'left' }}>
          <h2 className="mb-8 text-3xl font-bold">Update Medical Data</h2>
          <form onSubmit={handleSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
            <div className="flex gap-8">
              <div className="lg:w-1/3">
                <div className="mb-2">
                  <Label htmlFor="bloodType" value="Blood Type" />
                </div>
                <TextInput type="text" required name="bloodType" value={medicalData.bloodType} onChange={handleChange} className="w-full" />
              </div>
              <div className="lg:w-1/3">
                <div className="mb-2">
                  <Label htmlFor="allergies" value=" Allergies" />
                </div>
                <TextInput type="text" name="allergies" value={medicalData.allergies} onChange={handleChange} className="w-full" required />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="lg:w-1/3 h-30">
                <div className="mb-2">
                  <Label htmlFor="medicalConditions" value='Medical Conditions' />:
                </div>
                <Textarea type="text" name="medicalConditions" value={medicalData.medicalConditions} required onChange={handleChange} className="w-full" />
              </div>
              <div className="lg:w-1/3">
                <div className="mb-2">
                  <Label htmlFor="weight" value='Weight' />
                </div>
                <TextInput type="number" name="weight" value={medicalData.weight} onChange={handleChange} required className="w-full" />
              </div>
              <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="doctor" value='Doctor'/>
                        </div>
                        <select name="assigneddoctorTo" value={medicalData.assigneddoctorTo} required onChange={handleChange}>
  <option value="">Select Doctor</option>
  {doctors.map((doctor, index) => (
    <option key={index} value={doctor._id}>
      {doctor.firstName} {doctor.lastName}
    </option>
  ))}
</select>

                    </div>
            </div>
            <Button type="submit" className="lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
              Update
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateMedicalDataForm;
