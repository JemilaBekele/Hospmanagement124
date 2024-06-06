import  { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ListGroup, Button } from 'flowbite-react';
import { authService } from "../../services/authService";



const SavedMedicalData = () => {
    const { patientId } = useParams();
   
    const [medicalDataInfo, setMedicalDataInfo] = useState(null);
    const authToken = authService.getToken();


    const fetchMedicalData = useCallback(async () => {
        try {
            const response = await axios.get(`/api/v1/doc/medicine/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data)
            setMedicalDataInfo(response.data);
        } catch (error) {
            console.error('Error fetching medical data:', error);
        }
    }, [authToken, patientId]);

    useEffect(() => {
        fetchMedicalData();
    }, [fetchMedicalData]);

    const handleDeleteTask = async (medicalDatadocID) => {
        try {
            const response = await axios.delete(`/api/v1/doc/medicine/${patientId}/fix/${medicalDatadocID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
    
            if (response.status === 200) {
                // Filter out the deleted medical data from the current state
                const updatedMedicalData = medicalDataInfo.data.medicalDatadoc.filter(item => item._id !== medicalDatadocID);
    
                // Update the state with the remaining medical data
                setMedicalDataInfo(prevMedicalDataInfo => ({
                    ...prevMedicalDataInfo,
                    data: {
                        ...prevMedicalDataInfo.data,
                        medicalDatadoc: updatedMedicalData,
                    },
                }));
            } else {
                throw new Error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    

    return (
        
                <div className='w-100px'>
                    {medicalDataInfo && medicalDataInfo.data && medicalDataInfo.data.medicalDatadoc && medicalDataInfo.data.medicalDatadoc.length > 0 ? (
                        <ListGroup className='px-10 my-12 h-auto '>
                            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-800">Medical Data</h5>
                            <div className="details" >
                                {medicalDataInfo.data.medicalDatadoc.map((item, index) => (
                                    <div key={index} className="">
                                        <div className="details">
                                            <p className="mb-3 text-base  font-normal text-gray-700 dark:text-gray-600">AreaDiscomfort: {item.AreaDiscomfort}</p>
                                            
                                            <p className="mb-3 text-base font-normal text-gray-700 dark:text-gray-600" style={{ margin: '15px 0' }}>Releatedtreatment: {item.Releatedtreatment}</p>
                                            <p className="mb-3 text-base  font-normal text-gray-700 dark:text-gray-600" style={{ margin: '15px 0' }}>increasedecreasepain: {item.increasedecreasepain}</p>
                                            <p className="mb-3 text-base font-normal text-gray-700 dark:text-gray-600">symptoms: {item.symptoms}</p>
                                            <ListGroup.Item className="text-base font-normal  leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Frequencypian: {item.Frequencypian} ,  Daypain: {item.Daypain}</ListGroup.Item>
   
                                            <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Clinicalchemistry: {item.Clinicalchemistry}, Urinalysis: {item.Urinalysis}</ListGroup.Item>
                                      
                                            <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>serology: {item.serology}, bacteriology: {item.bacteriology}</ListGroup.Item>
                                            
                                           
                                            <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }} >hormonalassay: {item.hormonalassay}, coagulation: {item.coagulation}</ListGroup.Item>
                                           
                                         
                                            <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>stoolexamination: {item.stoolexamination}, </ListGroup.Item>

                                            <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>electrolytepanel: {item.electrolytepanel}, hematology: {item.hematology}</ListGroup.Item>
                                        </div>
                                        <div className="flex">
                                        <Button type="submit" onClick={() => handleDeleteTask(item._id)} className="lg:w-1/3 bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-1 rounded">
                                            Delete
                                        </Button>
                                        <Button type="submit" className="lg:w-1/3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-1 rounded">
                                            <Link to={`/Doctor/AddMedicalDataDoc/${patientId}/update/${item._id}`}>Update</Link>
                                        </Button>
                                    </div></div>
                                ))}
                            </div>
                        </ListGroup>
                    ) : (
                        <div className="mb-7 text-l font-medium text-gray-500 dark:text-gray-600">No medical data available...</div>
                    )}
                </div>
           
    );
};

export default SavedMedicalData;
