import { useState } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { authService } from "../../services/authService";
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataRegister } from '../../data'; 
import PropTypes from 'prop-types';
import {toast} from 'react-hot-toast'
import {  Button, Label, TextInput } from "flowbite-react";
const PatientForm = ({ formTitle, formData, onSubmit, onChange }) => {
  return (
    <div className="px-3 my-12" style={{ textAlign: 'left' }}>
    <h2 className="mb-8 text-3xl font-bold">{formTitle}</h2>
    <form onSubmit={onSubmit} className="grid grid-cols-3 gap-8">
      {Object.entries(formData).map(([fieldName, value]) => (
        <div className="flex flex-col" key={fieldName}>
          <div className="mb-2">
            <Label htmlFor={fieldName} value={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} />
          </div>
          {fieldName === 'gender' || fieldName === 'Status' ? (
            <select
              name={fieldName}
              value={value}
              required
              onChange={onChange}
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            >
              <option value="">{`Select ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}</option>
              {fieldName === 'gender' ? (
                <>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </>
              ) : fieldName === 'Status' ? (
                <>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </>
              ) : null}
            </select>
          ) : (
            <TextInput
              type={fieldName === 'age' ? 'number' : fieldName === 'dateOfBirth' ? 'date' : 'text'}
              name={fieldName}
              value={value}
              onChange={onChange}
              required
              className="py-2  w-full"
            />
          )}
        </div>
      ))}
      <div className="col-span-3">
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-full">
          Register
        </Button>
      </div>
    </form>
  </div>
  


  );
};

PatientForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const PatientUpdateForm = ({ setUpdate }) => {
  const { patientId } = useParams();
  const authToken = authService.getToken();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    gender: '',
    age: '',
    dateOfBirth: '',
    Status: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/v1/patient/get/${patientId}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if needed
        },
      });

      // Handle the response as needed
      console.log('Patient registered successfully:', response.data);
      toast.success('successful!');
      // Call setUpdate to update the state in the parent component
      setUpdate(true);
      
    } catch (error) {
      console.error('Error registering patient:', error);
    }
  };

  return (
    <section>
      <Navbar/>
      <div className='flex'>
        <SideBar sidebarData={sideBarDataRegister} />
        <div className='patientclass'>
          <PatientForm
            formTitle="Patient Registration Form"
            formData={formData}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
};

PatientUpdateForm.propTypes = {
  setUpdate: PropTypes.func.isRequired,
};


export default PatientUpdateForm;

