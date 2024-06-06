import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { authService } from "../../services/authService";
import { useState, useEffect } from 'react';

const PatientsTable = ({ patients, linkPrefix, updateData }) => {
  const authToken = authService.getToken();
  const [medicalDatadocID, setMedicalDataDocID] = useState({});

  useEffect(() => {
    const fetchMedicalDataIds = async () => {
      const fetchedIds = {};
      for (const patient of patients) {
        try {
          const medicalDataResponse = await axios.get(`/api/v1/doc/medicine/${patient._id}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          const medicalData = medicalDataResponse.data.data.medicalDatadoc[0];
          if (medicalData) {
            fetchedIds[patient._id] = medicalData._id;
          }
        } catch (error) {
          console.error('Error fetching medical data:', error.response?.data?.error || error.message);
        }
      }
      setMedicalDataDocID(fetchedIds);
    };

    fetchMedicalDataIds();
  }, [patients, authToken]);

  const handleUpdate = async (patientId) => {
    const medicalDataId = medicalDatadocID[patientId];
    if (!medicalDataId) {
      console.error('MedicalData _id not found');
      return;
    }

    try {
      await axios.patch(`/api/v1/pay/labstatus/${patientId}/update/${medicalDataId}`, updateData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      toast.success('Lab Status Updated Successfully!');
    } catch (error) {
      console.error('Error updating lab status:', error.response?.data?.error || error.message);
    }
  };

  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-700 rounded-md text-center'>No</th>
          <th className='border border-slate-700 rounded-md text-center'>First Name</th>
          <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Last Name</th>
          <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Age</th>
          <th className='border border-slate-700 rounded-md text-center max-md:hidden'>Phone Number</th>
          <th className='border border-slate-700 rounded-md text-center'>View</th>
          <th className='border border-slate-700 rounded-md text-center'>Update Lab Status</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr key={patient._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
            <td className='border border-slate-700 rounded-md text-center'>{patient.firstName}</td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.lastName}</td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.age}</td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{patient.phoneNumber}</td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                {medicalDatadocID[patient._id] && (
                  <Link to={`${linkPrefix}/${patient._id}/MED/${medicalDatadocID[patient._id]}`}>
                    <AiOutlineEdit className='text-2xl text-green-800' />
                  </Link>
                )}
              </div>
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <button onClick={() => handleUpdate(patient._id)}>{updateData.LabStatus}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

PatientsTable.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    medicalDataId: PropTypes.string, // Added medicalDataId as a PropType
  })).isRequired,
  linkPrefix: PropTypes.string.isRequired,
  updateData: PropTypes.object.isRequired
};

export default PatientsTable;
