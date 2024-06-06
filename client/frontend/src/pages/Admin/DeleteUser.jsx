import { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarData } from '../../data';

const DeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/v1/auth/getuser/${id}`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please check the console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleDeleteUser = () => {
    setLoading(true);
    axios
      .delete(`/api/v1/auth/getuser/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('User Deleted successfully', { variant: 'success' });
        navigate('/file-manager');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please check the console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <section>
    <Navbar/>
    <div className='flex'>
      <SideBar sidebarData={sideBarData} />
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete User</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[300px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete the user `{userData.firstName} {userData.lastName}`?</h3>

        <button
          className='p-3 bg-red-600 text-white m-2 w-full'
          onClick={handleDeleteUser}
        >
          Yes, Delete itt
        </button>
      </div>
    </div></div></section>
  );
};

export default DeleteUser;
