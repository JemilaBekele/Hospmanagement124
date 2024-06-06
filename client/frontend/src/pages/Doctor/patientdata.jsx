import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { Card } from 'flowbite-react';
import { authService } from "../../services/authService";


const Component = () => {
    const { patientId } = useParams();
    const [patientData, setPatientData] = useState(null);
    const [medicalData, setMedicalData] = useState(null);
     // State to control drawer visibility
   
    const authToken = authService.getToken();
    


    const fetchPatientData = useCallback(async () => {
        try {
            const response = await axios.get(`/api/v1/patient/get/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setPatientData(response.data);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    }, [authToken, patientId]);

    const fetchMedicalData = useCallback(async () => {
        try {
            const response = await axios.get(`/api/v1/nurse/medicine/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setMedicalData(response.data);
        } catch (error) {
            console.error('Error fetching medical data:', error);
        }
    }, [authToken, patientId]);

    useEffect(() => {
        fetchPatientData();
        fetchMedicalData();
    }, [fetchPatientData, fetchMedicalData]);

    return (
        <>
          <div className=' flex'>
                    <div className=' px-2'>
                        {patientData ? (
                            <Card className='px-3 my-3 h-auto max-w-sm'>
                                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-800">Patient Information</h5>
                                <div className="details">
                                    {[
                                        'firstName',
                                        'lastName',
                                        'address',
                                        'gender',
                                        'age',
                                        'phoneNumber'
                                    ].map(key => (
                                        <div key={key} className="flex mb-3 gap-5">
                                            <p className="text-lg font-normal leading-tight text-gray-700 dark:text-gray-600 ">{key === 'dateOfBirth' ? 'Date of Birth' : key.charAt(0).toUpperCase() + key.slice(1)}: {patientData.patient[key]}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ) : (
                            <div>NO PATIENT DATA</div> // Show loader while fetching patient data
                        )}
                    </div>
                    <div className='px-2'>
                        {medicalData && medicalData.data && medicalData.data.medicalData && medicalData.data.medicalData.length > 0 ? (
                            <Card className='px-3 my-3 h-auto max-w-sm'>
                                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-800">Medical Data</h5>
                                <div className="details">
                                    {medicalData.data.medicalData.map((item) => (
                                        <div key={item._id} className="flex flex-col mb-3 gap-5">
                                            <div className="details">
                                                <p className="">
                                                    <p className="text-lg font-normal leading-tight text-gray-700 dark:text-gray-600 ">Blood Type: {item.bloodType}</p>
                                                    <p className="text-lg font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Allergies: {item.allergies}</p>
                                                    <p className="text-lg font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Medical Conditions: {item.medicalConditions}</p>
                                                    <p className="text-lg font-normal leading-tight text-gray-700 dark:text-gray-600 ">Weight: {item.weight}</p>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ) : (
                            <div className="mb-7 text-l font-medium text-gray-500 dark:text-gray-600">No medical data available...</div>
                        )}
                    </div>
                    </div>          
        </>
    );
}


export default Component;
