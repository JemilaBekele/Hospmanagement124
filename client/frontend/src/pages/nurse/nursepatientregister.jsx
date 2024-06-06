import  { useState, useEffect} from 'react';
import axios from 'axios';
import {  Button,Textarea, Label, TextInput } from "flowbite-react";
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataNurse } from '../../data';
import { authService } from "../../services/authService";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
const AddMedicalDataForm = () => {
  const navigate= useNavigate()
  const { patientID } = useParams();
  const [doctors, setDoctors] = useState([]);
  const role = "doctor";
// Log patientId to check if it's undefined
  const authToken = authService.getToken();
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

  const handleChange = (e) => {
      const { name, value } = e.target;
      setMedicalData({ ...medicalData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post(`/api/v1/nurse/medicine/${patientID}`, medicalData, {
              headers: {
                  Authorization: `Bearer ${authToken}`,
                  // Add other headers if needed
              },
          });
          console.log('Response:', response.data); 
          toast.success('successful!');
          navigate(`/Patientview/view/${patientID}`);// Log response to check if request is successful
          // Optionally, you can add logic to update the UI or show a success message
      } catch (error) {
          console.error('Error adding medical data:', error.response?.data?.error || error.message);
          // Optionally, you can add logic to handle errors and show an error message
      }
  };

    return (
      <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarDataNurse} />
        <div className="px-3 my-12" style={{ textAlign: 'left' }}>
            <h2 className="mb-8 text-3xl font-bold">Add Medical Data</h2>
            <form onSubmit={handleSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                <div className="flex gap-8">
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label  htmlFor="bloodType" value="Blood Type"/>
                        </div>
                        <TextInput type="text" required name="bloodType" value={medicalData.bloodType} onChange={handleChange} className="w-full" />
                    </div>
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="allergies" value= " Allergies"/>
                        </div>
                        <TextInput type="text" name="allergies" value={medicalData.allergies} onChange={handleChange} className="w-full" required />
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="lg:w-1/3 h-30">
                        <div className="mb-2">
                            <Label htmlFor="medicalConditions" value='Medical Conditions'/>:
                        </div>
                        <Textarea type="text" name="medicalConditions" value={medicalData.medicalConditions} required onChange={handleChange} className="w-full" />
                    </div>
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="weight" value='Weight'/>
                        </div>
                        <TextInput type="number" name="weight" value={medicalData.weight} onChange={handleChange} required className="w-full" />
                    </div>
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="doctor" value='Doctor'/>
                        </div>
                        <select name="assigneddoctorTo" value={medicalData.assigneddoctorTo} onChange={handleChange}>
  <option value="">Select Doctor</option>
  {doctors.map((doctor, index) => (
    <option key={index} value={doctor._id}>
      {doctor.firstName} {doctor.lastName}
    </option>
  ))}
</select>

                    </div>
                    
                </div>
                < Button type="submit" className="lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    Submit
                </ Button>
            </form>
        </div></div>
    </section>
    );
};

export default AddMedicalDataForm;
