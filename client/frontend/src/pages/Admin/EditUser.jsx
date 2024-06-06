import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';


import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarData } from '../../data';
import { TextInput } from "flowbite-react";

const EditUser = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    role: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/getuser/${id}`);
        const userData = response.data.user; // Assuming the user data is nested under 'user' key
        if (userData) {
          setUser(userData);
          
        } else {
          console.error('User data not found:', response.data);
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.error || error.message);
        
      }
    };
  
    fetchUserData();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/v1/auth/getuser/${id}`, user);
      console.log('Response:', response.data);
      toast.success('User updated successfully!');
      navigate("/file-manager");
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  return (
    <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarData} />
        <div className='p-4'>
       
          <h1 className='text-3xl my-4'>Edit User</h1>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <TextInput label="First Name" name="firstName" value={user.firstName} onChange={handleChange} />
            <TextInput label="Last Name" name="lastName" value={user.lastName} onChange={handleChange} />
            <TextInput label="Email" type="email" name="email" value={user.email} onChange={handleChange} />
            <TextInput label="Address" name="address" value={user.address} onChange={handleChange} />
            <TextInput label="Role" name="role" value={user.role} onChange={handleChange} />
            <TextInput label="Phone Number" type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
            <button className='p-2 bg-sky-300 m-8' onClick={handleEditUser}>
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
