import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { authService } from "../../services/authService";
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataNurse, sideBarDatalab, sideBarDataRegister, sideBarDatadoctor } from '../../data';
import './PatientAdd.scss';
import SavedMedicalData from '../Doctor/savedmedicaldata'
const PatientView = () => {
    const { patientId } = useParams();
    const [patientData, setPatientData] = useState(null);
    const [medicalData, setMedicalData] = useState(null);
    const authToken = authService.getToken();
    const userRole = authService.getUserRole();

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

    const handleDeleteTask = async (medicalDataID) => {
        try {
            const response = await fetch(`/api/v1/nurse/medicine/${patientId}/update/${medicalDataID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            setMedicalData(prevMedicalData => ({
                ...prevMedicalData,
                data: {
                    ...prevMedicalData.data,
                    medicalData: prevMedicalData.data.medicalData.filter(item => item._id !== medicalDataID)
                }
            }));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <section>
            <Navbar />
            <div className='flex'>
                <SideBar sidebarData={userRole === 'nurse' ? sideBarDataNurse : (userRole === 'doctor' ? sideBarDatadoctor : (userRole === 'Labratory' ? sideBarDatalab : sideBarDataRegister))} />
                <div className='grid grid-cols-1 md:grid-cols-2 px-1'>
                <div className='px-10'>
                <h5 className="mb-2 text-xl py-3 font-bold text-gray-500 dark:text-gray-800">Patient Information</h5>
                    <div>
                        {patientData ? (
                            <Card className='px-10 my-3 h-auto max-w-sm'>
                               
                                {userRole === 'nurse' && (
                                    <Link className="mb-1 text-lg font-medium text-gray-500 dark:text-gray-700" to={`/nurse/AddMedicalDataForm/${patientId}`}>Add medical Information</Link>
                                )}
                                {userRole === 'doctor' && (
                                    <Link className="mb-1 text-lg font-medium text-gray-500 dark:text-gray-700" to={`/Doctor/AddMedicalDataDoc/${patientId}`}>Add Medical Data</Link>
                                )}
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
                            <div>Loading patient data...</div>
                        )}
                    </div>
                    <div>
                        {medicalData && medicalData.data && medicalData.data.medicalData && medicalData.data.medicalData.length > 0 ? (
                            medicalData.data.medicalData.map((item, index) => (
                                <Card key={index} className='px-10 my-4 h-auto max-w-sm'>
                                    <div className="details">
                                        <p className="text-lg font-normal leading-tight text-gray-700 dark:text-gray-600 ">Blood Type: {item.bloodType}</p>
                                        <p className="text-lg font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Allergies: {item.allergies}</p>
                                        <p className="text-lg font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Medical Conditions: {item.medicalConditions}</p>
                                        <p className="text-lg font-normal leading-tight text-gray-700 dark:text-gray-600 ">Weight: {item.weight}</p>            
                                    </div>
                                    <div className="flex">
                                        <Button type="submit" onClick={() => handleDeleteTask(item._id)} className="lg:w-1/3 bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-1 rounded">
                                            Delete
                                        </Button>
                                        <Button type="submit" className="lg:w-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-1 rounded">
                                            <Link to={`/nurse/AddMedicalDataForm/${patientId}/UpdateMedicalDataForm/${item._id}`}>Update</Link>
                                        </Button>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div className="mb-7 text-l font-medium text-gray-500 dark:text-gray-600">No medical data available...</div>
                        )}
                    </div>
                    {/* Add your additional content here */}
                </div><SavedMedicalData/></div>
            </div>
        </section>
    );
};

export default PatientView;
