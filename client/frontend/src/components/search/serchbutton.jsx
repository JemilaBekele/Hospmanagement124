import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDatadoctor } from '../../data'; 
import { authService } from "../../services/authService";
import { useParams, Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
const SearchPage = () => {
  const { query } = useParams();
  const authToken = authService.getToken();
  const [searchResults, setSearchResults] = useState({ patients: [] });

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/patient/search/${query}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults({ patients: [] });
      }
    };

    fetchData();
  }, [query, authToken]);

 
  return (
    <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarDatadoctor} />
        <div className="px-4 py-6 w-full">
          <h2 className="text-2xl font-semibold mb-4">Search Results for {query}</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-200 w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gender</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700"> view</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.patients.map((patient, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.firstName} {patient.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><Link  to={`/Patientview/view/${patient._id}`}><AiOutlineEdit className='text-2xl text-green-800' /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
  
  
  
};

export default SearchPage;
