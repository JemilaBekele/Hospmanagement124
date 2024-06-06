import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { RiDivideLine } from 'react-icons/ri';
import "./add.scss"

const EditUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/v1/auth/getuser/${id}`)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setRole(response.data.role);
        setPhoneNumber(response.data.phoneNumber);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check the console');
        console.log(error);
      });
  }, [id]);

  const handleEditUser = () => {
    const data = {
      firstName,
      lastName,
      email,
      address,
      role,
      phoneNumber,
    };
    setLoading(true);
    axios
      .patch(`/api/v1/auth/getuser/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('User Edited successfully', { variant: 'success' });
        // Optionally, you can navigate back to the user detail page or another route
        // navigate(`/users/${id}`);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };


    return (
    <div className="add">
      {loading ? <Spinner /> : ''}

      <div className="modal">
        <span className="close" >
          X
        </span>
        <h1>Add new </h1>
        <div>
<form>
              <div className="item">
                <div >
  <input
    type='text'
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    placeholder='First Name'
  />
</div>
<div >
  <input
    type='text'
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full '
    placeholder='Last Name'
  />
</div>
<div >
  <input
    type='email'
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full '
    placeholder='Email'
  />
</div>
<div >
  <input
    type='text'
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full '
    placeholder='Address'
  />
</div>
<div >
  <input
    type='text'
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full '
    placeholder='Role'
  />
</div>
<div >
  <input
    type='tel'
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full '
    placeholder='Phone Number'
  />
</div>
<button onClick={handleEditUser}>
  Save
</button>

</div>
</form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
