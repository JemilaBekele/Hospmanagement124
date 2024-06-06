import  { useState} from 'react';
import axios from 'axios';
import {  Button,Textarea, Label} from "flowbite-react";
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDatadoctor } from '../../data';
import { authService } from "../../services/authService";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import Labresult  from '../Registeral/Labresult'
const CreateLab = () => {
    const navigate = useNavigate();
    const { patientId, medicalDatadocID } = useParams();
    const authToken = authService.getToken();
  
    const [medicalLabInfo, setMedicalLabInfo] = useState({
        laboratoryTests: '',
        laboratoryFindings: '',
        comments: '',
        
        doctorId: ''
     
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setMedicalLabInfo({ ...medicalLabInfo, [name]: value });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`/api/v1/doc/labtest/${patientId}/result/${medicalDatadocID}`, medicalLabInfo, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            // Add other headers if needed
          },
        });
        console.log('Response:', response.data);
        toast.success('Successful!');
        navigate(`/Labrarory/Labraroryprogress`);
      } catch (error) {
        console.error('Error adding lab data:', error.response?.data?.error || error.message);
      }
    };
 
    return (
      <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarDatadoctor} />
        <Labresult />
        <div className="px-3 my-12" style={{ textAlign: 'left' }}>
        
            <h2 className="mb-8 text-3xl font-bold">Add Lab Data</h2>
           
            <form onSubmit={handleSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                <div className="flex gap-8">
                    <div className="lg:w-1/2 ">
                        <div className="mb-2">
                            <Label  htmlFor="laboratoryTests" value="laboratoryTests"/>
                        </div>
                        <Textarea type="text" required name="laboratoryTests" value={medicalLabInfo.laboratoryTests} onChange={handleChange} className="w-full resize-none" // Add the resize-none class to prevent resizing of the TextArea
                             rows={6} />
                    </div>
                   
                    
                </div>
                
                <div className="flex gap-8">          
                    <div className="lg:w-1/2">
                        <div className="mb-2">
                            <Label htmlFor="laboratoryFindings" value= "laboratoryFindings"/>
                        </div>
                        <Textarea type="text" name="laboratoryFindings" value={medicalLabInfo.laboratoryFindings} onChange={handleChange} className="w-full resize-none" rows={6} required />
                    </div>
                </div>
                <div className="flex gap-8">
               <div className="lg:w-1/2">
                   <div className="mb-2">
                       <Label htmlFor="comments" value= "comments"/>
                   </div>
                   <Textarea type="text" name="comments" value={medicalLabInfo.comments} onChange={handleChange} className="w-full resize-none" rows={6} required />
               </div>
           </div>
                < Button type="submit" className="lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    Submit
                </ Button>
            </form>
        </div></div>
    </section>
    );
};

export default CreateLab ;
