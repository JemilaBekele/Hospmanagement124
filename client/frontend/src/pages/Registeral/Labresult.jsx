import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ListGroup, Button } from 'flowbite-react';
import { authService } from "../../services/authService";
import { toast } from 'react-hot-toast';

const Labresult = () => {
    const { patientId } = useParams();
    const userRole = authService.getUserRole();
    const [medicalDataInfo, setMedicalDataInfo] = useState(null);
    const authToken = authService.getToken();

    const fetchMedicalData = useCallback(async () => {
        try {
            const response = await axios.get(`/api/v1/doc/medicine/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data);
            setMedicalDataInfo(response.data);
        } catch (error) {
            console.error('Error fetching medical data:', error);
        }
    }, [authToken, patientId]);

    useEffect(() => {
        fetchMedicalData();
    }, [fetchMedicalData]);

    const handleUpdate = async (medicalDatadocID) => {
        try {
            const updatedData = {
                paid: true // Update the 'paid' field to true
            };

            const response = await axios.patch(`/api/v1/pay/paymentconfirm/${patientId}/approve/${medicalDatadocID}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    // Add other headers if needed
                },
            });
            console.log('Response:', response.data);
            toast.success('Payment Approved Successfully!');
        } catch (error) {
            console.error('Error updating medical data:', error.response?.data?.error || error.message);
        }
    };

    return (
        <div className='w-10px'>
            {medicalDataInfo && medicalDataInfo.data && medicalDataInfo.data.medicalDatadoc && medicalDataInfo.data.medicalDatadoc.length > 0 ? (
                <ListGroup className='px-5 my-12 h-auto'>
                    <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-800">Laboratory Data</h5>
                    <div className="details">
                        {medicalDataInfo.data.medicalDatadoc.map((item, index) => (
                            <div key={index} className="">
                                <div className="details">
                                <div className="details">
    <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600" style={{ margin: '15px 0' }}>
        <strong>Clinical Chemistry: </strong> {item.Clinicalchemistry}
    </ListGroup.Item>
    <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600" style={{ margin: '15px 0' }}>
        <strong>Serology: </strong> {item.serology}
    </ListGroup.Item>
    <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600" style={{ margin: '15px 0' }}>
        <strong>Hormonal Assay:</strong> {item.hormonalassay}, Coagulation: {item.coagulation}
    </ListGroup.Item>
    <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600" style={{ margin: '15px 0' }}>
        <strong>Coagulation:</strong> {item.coagulation}
    </ListGroup.Item>
    <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600" style={{ margin: '15px 0' }}>
        <strong>Stool Examination:</strong> {item.stoolexamination}
    </ListGroup.Item>
    <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600" style={{ margin: '15px 0' }}>
        <strong>Electrolyte Panel:</strong> {item.electrolytepanel}, Hematology: {item.hematology}
    </ListGroup.Item>
    <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600" style={{ margin: '15px 0' }}>
        <strong>Hematology</strong>  {item.hematology}
    </ListGroup.Item>
</div>
                                </div>
                                {userRole === 'registrar' &&
                                    <div className="flex">
                                        <Button type="submit" onClick={() => handleUpdate(item._id)} className="lg:w-1/3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-1 rounded">
                                            Payment Approve
                                        </Button>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </ListGroup>
            ) : (
                <div className="mb-7 text-l font-medium text-gray-500 dark:text-gray-600">No medical data available...</div>
            )}
        </div>
    );
};

export default Labresult;
