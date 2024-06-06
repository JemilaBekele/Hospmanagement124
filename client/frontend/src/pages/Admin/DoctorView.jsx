import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner'
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete} from 'react-icons/md'
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarData } from '../../data';
// ... (imports)

export default function DoctorView() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = "doctor";

  useEffect(() => {
    setLoading(true);

    axios
      .get('/api/v1/auth/getuser')
      .then((response) => {
        console.log("API Response:", response);

        if (response.data.user) {
          console.log("User Object:", response.data.user);

          // Filter users based on the required role
          const filteredUsers = response.data.user.filter(user => user.role === role);

          setUser(filteredUsers);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner/>
  }

  if (user.length === 0) {
    return <div>No users found with the required role.</div>;
  }

  return (
    <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarData} />
        <div className='p-4'>
          <div className='flex justify-center items-center gap-x-4'>
            {/* ... (your existing code) */}
            <div>
              <h1 className='flex flex-col justify-between  items-center text-3xl my-8'>
              Doctors Information
              </h1>
              <table className='w-full border-separate border-spacing-2'>
                {/* ... (your existing table code) */}
                <tbody>
                {user.map((user, index) => (
            <tr key={user._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>
                {index + 1}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                {user.firstName}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {user.lastName}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {user.email}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {user.address}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {user.role}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {user.phoneNumber}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/getuser/detail/${user._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/getuser/edit/${user._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                  </Link>
                  <Link to={`/getuser/delete/${user._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
