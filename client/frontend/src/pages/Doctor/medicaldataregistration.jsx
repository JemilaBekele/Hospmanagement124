import  { useState} from 'react';
import axios from 'axios';
import {  Select,Button,Textarea, Label} from "flowbite-react";
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDatadoctor } from '../../data';
import { authService } from "../../services/authService";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import Component from './patientdata'
const AddMedicalDataDoc = () => {
    const navigate = useNavigate();
    const { patientId } = useParams();
    const authToken = authService.getToken();
  
    const [medicalDataInfo, setMedicalDataInfo] = useState({
      AreaDiscomfort: '',
      OnsetDiscomfort: '',
      Frequencypian: 'constant',
      Daypain: 'morning',
      Releatedtreatment: '',
      increasedecreasepain: '',
      symptoms: '',
      Clinicalchemistry: '',
      Urinalysis: '',
      serology: '',
      bacteriology: '',
      hormonalassay: '',
      coagulation: '',
      stoolexamination: '',
      electrolytepanel: '',
      hematology: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setMedicalDataInfo({ ...medicalDataInfo, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`/api/v1/doc/medicine/${patientId}`, medicalDataInfo, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            // Add other headers if needed
          },
        });
        console.log('Response:', response.data);
        toast.success('Successful!');
        navigate(`/Patientview/view/${patientId}`);
      } catch (error) {
        console.error('Error adding medical data:', error.response?.data?.error || error.message);
      }
    };
 
    return (
      <section>
      <Navbar />
      <div className='flex'>
        <SideBar sidebarData={sideBarDatadoctor} />
        <div className="px-3 my-12" style={{ textAlign: 'left' }}>
        <Component />
            <h2 className="mb-8 text-3xl font-bold">Add Medical Data</h2>
           
            <form onSubmit={handleSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                <div className="flex gap-8">
                    <div className="lg:w-1/2 ">
                        <div className="mb-2">
                            <Label  htmlFor="AreaDiscomfort" value="AreaDiscomfort"/>
                        </div>
                        <Textarea type="text" required name="AreaDiscomfort" value={medicalDataInfo.AreaDiscomfort} onChange={handleChange} className="w-full resize-none" // Add the resize-none class to prevent resizing of the TextArea
                             rows={6} />
                    </div>
                   
                    
                </div>
                <div className="flex gap-8">
               
                <div className="lg:w-1/5">
                        <div className="mb-2">
                            <Label htmlFor="Frequencypian" value= "Frequencypian"/>
                        </div>
                        <Select id="Frequencypian"  name="Frequencypian" value={medicalDataInfo.Frequencypian} onChange={handleChange} required>
                            <option>constant</option>
                            <option>off/on</option>
                            <option>at rest</option>
                            <option>with activity</option>
                            <option>other</option>
                     </Select>
                    </div>
                    <div className="lg:w-1/5">
                        <div className="mb-2">
                            <Label htmlFor="Daypain" value= "Daypain"/>
                        </div>
                        <Select id="Daypain"  name="Daypain" value={medicalDataInfo.Daypain} onChange={handleChange} required>
                            <option>morning</option>
                            <option>afternoon</option>
                            <option>evening</option>
                            <option>during sleep</option>
                            <option>other</option>
                     </Select>
                    </div>
                </div>
                <div className="flex gap-8">          
                    <div className="lg:w-1/2">
                        <div className="mb-2">
                            <Label htmlFor="Releatedtreatment" value= "Releatedtreatment"/>
                        </div>
                        <Textarea type="text" name="Releatedtreatment" value={medicalDataInfo.Releatedtreatment} onChange={handleChange} className="w-full resize-none" rows={6} required />
                    </div>
                </div>
                <div className="flex gap-8">
               <div className="lg:w-1/2">
                   <div className="mb-2">
                       <Label htmlFor="increasedecreasepain" value= "increasedecreasepain"/>
                   </div>
                   <Textarea type="text" name="increasedecreasepain" value={medicalDataInfo.increasedecreasepain} onChange={handleChange} className="w-full resize-none" rows={6} required />
               </div>
           </div>
           <div className="flex gap-8">
                <div className="lg:w-1/2 h-30">
                        <div className="mb-2">
                            <Label htmlFor="symptoms" value='symptoms'/>:
                        </div>
                        <Textarea type="text" name="symptoms" value={medicalDataInfo.symptoms} required onChange={handleChange} className="w-full resize-none" rows={6} />
                    </div>
           </div>
           <h2 className="mb-4 text-3l font-medium">Labratory Test Request Form</h2>
                <div className="flex gap-8">
                
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="Clinicalchemistry" value='Clinicalchemistry'/>
                        </div>
                        <Select id="Clinicalchemistry"  name="Clinicalchemistry" value={medicalDataInfo.Clinicalchemistry} onChange={handleChange} required>
                            <option>FBS/RBS</option>
                            <option>SGOT/AST</option>
                            <option>ALP</option>
                            <option>BILIRUBIN(T)</option>
                            <option>Bilrubin(D)</option>
                            <option>Total Protine</option>
                            <option>Albumin</option>
                            <option>BUN/Urea</option>
                            <option>Creatinine</option>
                            <option>Cholesterol</option>
                            <option>Triglyceride</option>
                            <option>HDL</option>
                            <option>LDL</option>
                            <option>Uric acid</option>
                            <option>Amylase</option>
                            <option>Lipase</option>
                            <option>LDH</option>
                     </Select>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="Urinalysis" value='Urinalysis'/>
                        </div>
                        <Select id="Urinalysis" name="Urinalysis" value={medicalDataInfo.Urinalysis} onChange={handleChange} required>
                            <option>Color</option>
                            <option>Appearance</option>
                            <option>PH</option>
                            <option>Sp Gravity</option>
                            <option>Protein</option>
                            <option>Glucose</option>
                            <option>Ketone</option>
                            <option>Bilirubin</option>
                            <option>Urobilinogen</option>
                            <option>Blood</option>
                            <option>Nitrite</option>
                            <option>Leukocyte</option>
                            <option>Microscopic</option>
                            <option>Epit Cells</option>
                            <option>RBC</option>
                            <option>WBC</option>
                            <option>Casts</option>
                            <option>Crystals</option>
                     </Select>
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="serology" value='serology'/>
                        </div>
                        <Select id="serology" name="serology" value={medicalDataInfo.serology} onChange={handleChange} required>
                            <option>Widal H</option>
                            <option>O</option>
                            <option>Weilfelix</option>
                            <option>HBsAg</option>
                            <option>HCV</option>
                            <option>ASO</option>
                            <option>RF</option>
                            <option>VDRL/RPR</option>
                            <option>H.Pylori Ag</option>
                            <option>H.pylori ab</option>
                            <option>HIV ab</option>
                            <option>RDT</option>
                            <option>Serum HCG</option>
                     </Select>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="bacteriology"  value='bacteriology'/>
                        </div>
                        <Select id="bacteriology" name="bacteriology" value={medicalDataInfo.bacteriology} onChange={handleChange} required>
                            <option>KOH</option>
                            <option>Gram Stain</option>
                            <option>Wet mount</option>
                            <option>Skin snip</option>
                            <option>Culture & Sensitivity</option>
                          
                     </Select>
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="hematology" value='hematology'/>
                        </div>
                        <Select id="hematology" name="hematology" value={medicalDataInfo.hematology} onChange={handleChange} required>
                            <option>CBC</option>
                            <option>ESR</option>
                            <option>Bllod Groud & Rh</option>
                            <option>Periph Morp</option>
                            <option>Comb test</option>
                            <option>Blood Film</option>
                     </Select>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="coagulation" value='coagulation'/>
                        </div>
                        <Select id="coagulation" name="coagulation"  value={medicalDataInfo.coagulation} onChange={handleChange} required>
                            <option>PT</option>
                            <option>PTT</option>
                            <option>INR</option>                        
                     </Select>
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="stoolexamination" value='stoolexamination'/>
                        </div>
                        <Select id="stoolexamination"  name="stoolexamination"  value={medicalDataInfo.stoolexamination} onChange={handleChange} required>
                            <option>Color</option>
                            <option>Consistency</option>
                            <option>Occult Blood</option>                        
                     </Select>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="electrolytepanel" value='electrolytepanel'/>
                        </div>
                        <Select id="electrolytepanel" name="electrolytepanel"   value={medicalDataInfo.electrolytepanel} onChange={handleChange} required>
                            <option>Sodium</option>
                            <option>Potassium</option>
                            <option>Chloride</option>   
                            <option>Calcium</option>
                            <option>Magnesium</option>                                             
                     </Select>
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="lg:w-1/3">
                        <div className="mb-2">
                            <Label htmlFor="hormonalassay" value='hormonalassay'/>
                        </div>
                        <Select id="hormonalassay" name="hormonalassay" value={medicalDataInfo.hormonalassay} onChange={handleChange} required>
                            <option>Estadiol</option>
                            <option>FSH</option>
                            <option>LH</option>   
                            <option>Prolacin</option>
                            <option>Progesteron</option>   
                            <option>Testosterone</option>
                            <option>Beta HCG</option>                                             
                     </Select>
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

export default AddMedicalDataDoc;
