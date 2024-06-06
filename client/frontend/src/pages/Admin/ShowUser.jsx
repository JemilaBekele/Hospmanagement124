import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarData } from '../../data';
import { ListGroup } from 'flowbite-react';

export default function ShowUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/v1/auth/getuser/${id}`)
      .then((response) => {
        setUser(response.data.user); // Assuming your API responds with { user: userObject }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]); // Including id as a dependency to re-fetch when id changes

  if (loading) {
    return (
      <Spinner />
    );
  }

  if (!user) {
    return (
      <div>No user data available</div>
    );
  }

  return (
    <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarData} />
        <div className='p-4'>
          
          <h1 className='text-3xl my-4'>Show Employee</h1>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <ListGroup className='px-10 my-12 h-auto'>
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-800">Medical Data</h5>
              <div className="details">
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>FirstName: {user.firstName} </ListGroup.Item>
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>LastName: {user.lastName}</ListGroup.Item>
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Email: {user.email}</ListGroup.Item>
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Address: {user.address}</ListGroup.Item>
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Role: {user.role}</ListGroup.Item>
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Phone Number: {user.phoneNumber}</ListGroup.Item>
              </div>
            </ListGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
