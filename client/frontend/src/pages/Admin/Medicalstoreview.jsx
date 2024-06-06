import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarData } from '../../data';
import { ListGroup } from 'flowbite-react';

export default function ShowMedicalmaterial() {
  const [medicalmaterial, setMedicalMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const { medicineId } = useParams();

  useEffect(() => {
    axios.get(`/api/v1/medicine/getmedicine/${medicineId}`)
      .then((response) => {
        const { medicine } = response.data;
        if (medicine) {
          setMedicalMaterial(medicine);
        } else {
          console.error('No medical material data found in the response:', response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching medical material:', error);
        setLoading(false);
      });
  }, [medicineId]);

  if (loading) {
    return <Spinner />;
  }

  if (!medicalmaterial) {
    return <div>No medical material data available</div>;
  }

  return (
    <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarData} />
        <div className='p-4'>
          <h1 className='text-3xl my-4'>Show Medical Material</h1>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <ListGroup className='px-10 my-12 h-auto'>
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-800">Medical Material</h5>
              <div className="details">
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Material Name: {medicalmaterial.name} </ListGroup.Item>
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Purchase Date: {medicalmaterial.purchaseDate}</ListGroup.Item>
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Price: {medicalmaterial.price}</ListGroup.Item>
                <ListGroup.Item className="text-base font-normal leading-tight text-gray-700 dark:text-gray-600 " style={{ margin: '15px 0' }}>Quantity: {medicalmaterial.quantity}</ListGroup.Item>
              </div>
            </ListGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
