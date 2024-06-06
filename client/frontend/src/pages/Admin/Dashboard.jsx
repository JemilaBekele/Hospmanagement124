import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarData } from '../../data';
export default function Dashboard() {
  const [roleCounts, setRoleCounts] = useState({
    nurse: 0,
    doctor: 0,
    admin: 0,
    registrar: 0,
    Labratory: 0,
    radiology: 0,

  });

  useEffect(() => {
    const fetchRoleCounts = async () => {
      try {
        const response = await axios.get('/api/v1/auth/getuser');
        setRoleCounts(response.data.roleCounts);
      } catch (error) {
        console.error('Error fetching role counts:', error);
      }
    };

    fetchRoleCounts();
  }, []);

  return (
    <section>
    <Navbar/>
    <div className='flex'>
      <SideBar sidebarData={sideBarData} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="mx-4 my-8 p-6 bg-white rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Data of Employee</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-200 rounded-lg">
                <p className="text-xl font-semibold">Nurse:</p>
                <p className="text-2xl">{roleCounts.nurse}</p>
              </div>
              <div className="p-4 bg-green-200 rounded-lg">
                <p className="text-xl font-semibold">Doctor:</p>
                <p className="text-2xl">{roleCounts.doctor}</p>
              </div>
              <div className="p-4 bg-yellow-200 rounded-lg">
                <p className="text-xl font-semibold">Admin:</p>
                <p className="text-2xl">{roleCounts.admin}</p>
              </div>
              <div className="p-4 bg-red-200 rounded-lg">
                <p className="text-xl font-semibold">Registrar:</p>
                <p className="text-2xl">{roleCounts.registrar}</p>
              </div>
              <div className="p-4  bg-lime-200 rounded-lg">
                <p className="text-xl font-semibold">Radiology:</p>
                <p className="text-2xl">{roleCounts.radiology}</p>
              </div>
              <div className="p-4 bg-orange-200 rounded-lg">
                <p className="text-xl font-semibold">Labratory:</p>
                <p className="text-2xl">{roleCounts.Labratory}</p>
              </div>
            </div>
          </div>
        </main>
        </div>
    </section>
  );
}
