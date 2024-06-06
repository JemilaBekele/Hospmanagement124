import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';


import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarData } from '../../data';
import { TextInput, Label } from "flowbite-react";

const Editmedicalmaterial = () => {
  const [medicalmaterial, setMedicalMaterial] = useState({
        name: '',
        purchaseDate: '',
        price: '',
        quantity: '',
  });
  const navigate = useNavigate();
  const { medicineId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/v1/medicine/getmedicine/${medicineId}`);
        const userData = response.data.medicine; // Assuming the user data is nested under 'user' key
        if (userData) {
            setMedicalMaterial(userData);
          
        } else {
          console.error('User data not found:', response.data);
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.error || error.message);
        
      }
    };
  
    fetchUserData();
  }, [medicineId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicalMaterial({ ...medicalmaterial, [name]: value });
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/v1/medicine/getmedicine/${medicineId}`, medicalmaterial);
      console.log('Response:', response.data);
      toast.success('medicalmaterial updated successfully!');
      navigate("/MedicalStore");
    } catch (error) {
      console.error('Error updating medicalmaterial:', error);
      toast.error('Failed to update medicalmaterial.');
    }
  };

  return (
    <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarData} />
        <div className='p-4'>
       
          <h1 className='text-3xl my-4'>Edit Medical Material</h1>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className="mb-2">
                            <Label  htmlFor="name" value="Material Name"/>
                        </div>
            <TextInput label="name" name="name" value={medicalmaterial.name} onChange={handleChange} />
            
            
            <div className="mb-2">
            <Label  htmlFor="purchaseDate" value="Purchase Date"/>
            </div>
            <TextInput label="purchaseDate" type= "date" name="purchaseDate" value={medicalmaterial.purchaseDate} onChange={handleChange} />
            
            <div className="mb-2">
             <Label  htmlFor="price" value="Price"/>
            </div>
            <TextInput label="price" type="number" name="price" value={medicalmaterial.price} onChange={handleChange} />
            <div className="mb-2">
             <Label  htmlFor="quantity" value="Quantity"/>
            </div>
            <TextInput label="quantity" type="number"  name="quantity" value={medicalmaterial.quantity} onChange={handleChange} />
           
            <button className='p-2 bg-sky-300 m-8' onClick={handleEditUser}>
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editmedicalmaterial;