import { Routes, Route} from 'react-router-dom'
import Fielmanage from "./pages/Admin/Fielmanage";
import Login from "./pages/Login";
import Register from "./pages/Admin/Register";
import WelcomePage from "./pages/WelcomePage";
import DeleteUser from "./pages/Admin/DeleteUser";
import EditUser from "./pages/Admin/EditUser";
import ShowUser from "./pages/Admin/ShowUser";
import Dashboard from "./pages/Admin/Dashboard";
import MedicalStore from "./pages/Admin/MedicalStore";
import ShowMedicalmaterial from "./pages/Admin/Medicalstoreview";
import Editmedicalmaterial from "./pages/Admin/medicalstoreupdate";
import BedRoom from "./pages/Registeral/bedroom"
import DashboardRception from "./pages/Registeral/DashboardRception"
import BedRoomView from "./pages/Registeral/BedRoomView"
import PatientRegistrationForm from "./pages/Registeral/PatientRegistrationForm"
import Patientview from "./pages/Registeral/Patientview"
import PatientUpdateForm from "./pages/Registeral/PatientUpdateForm"
import PaymentConfirm from "./pages/Registeral/patientconfirmation"
import PaymentApprove from "./pages/Registeral/paymentapprove"
import NurseAcceptPatient from "./pages/nurse/nurseacceptpatient"
import { PrivateRoute } from "./routes/PrivateRoutes";
import DoctorView from "./pages/Admin/DoctorView"
import NurseDashboard from "./pages/nurse/nursedashboard"
import UpdateMedicalDataForm from "./pages/nurse/nurseupdate"
import AddMedicalDataForm from "./pages/nurse/nursepatientregister"
import NurseView from "./pages/nurse/nurseview"
import UploadBook from "./pages/nurse/practice form"
import DoctorDashboard from "./pages/Doctor/dashboard"
import UpdateMedicalDataDoc from "./pages/Doctor/medicaldataupdate"
import AddMedicalDataDoc from "./pages/Doctor/medicaldataregistration"
import LabStart from "./pages/Labratory/labratoryDashboard"
import LabEnd from "./pages/Labratory/Labend"
import LabProgress from "./pages/Labratory/LabPeogress"
import CreateLab from "./pages/Labratory/createlab"
import SearchPage from "./components/search/serchbutton"
import './App.css'
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/DoctorView" element={<DoctorView/>}/>ShowMedicalmaterial
          
          <Route path="/MedicalStore" element={<MedicalStore/>}/>

          <Route path="/welcome" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/file-manager" element={<Fielmanage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/getuser/delete/:id" element={<DeleteUser />} />
          <Route path="/getuser/edit/:id" element={<EditUser />} />
          <Route path="/getuser/detail/:id" element={<ShowUser />} />
          <Route path="/MedicalStore/:medicineId" element={<ShowMedicalmaterial/>}/>
          <Route path="/MedicalStore/update/:medicineId" element={<Editmedicalmaterial/>}/>

          <Route path='/Patientapprove/valid/:patientId' element={<PaymentApprove/>}/>
          <Route path='/PatientRegistrationForm' element={<PatientRegistrationForm/>}/>
          <Route path='/PaymentConfirm' element={<PaymentConfirm/>}/>
          <Route path="/DashboardRception" element={<DashboardRception/>}/>
          <Route path="/Patientview/view/:patientId" element={<Patientview/>}/>
          <Route path="/PatientUpdateForm/view/:patientId" element={<PatientUpdateForm/>}/>
          <Route path="/BedRoom" element= {<BedRoom/>}/>
          <Route path="/BedRoomView/view/:roomID" element={<BedRoomView/>}/>


          <Route path="/nurse/NurseDashboard" element={<NurseDashboard/>}/>
          <Route path="/nurse/AddMedicalDataForm/:patientID" element={<AddMedicalDataForm />}/>
          <Route path="/nurse/NurseView/:medicalId" element={<NurseView/>}/>
          <Route path="/nurse/AddMedicalDataForm/:patientID/UpdateMedicalDataForm/:medicalDataID" element={<UpdateMedicalDataForm />}/>
          <Route path="/nurse/NurseAcceptPatient" element={<NurseAcceptPatient/>}/>
          <Route path="/nurse/Nurse" element={<UploadBook/>}/>

          <Route path="/Doctor/DoctorDashboard" element={<DoctorDashboard/>}/>
          <Route path="/Doctor/AddMedicalDataDoc/:patientId/update/:medicalDatadocID" element={<UpdateMedicalDataDoc/>}/>
          <Route path="/Doctor/AddMedicalDataDoc/:patientId" element={<AddMedicalDataDoc/>}/>
          <Route path="/Doctor/search/:query" element={<SearchPage/>}/>


          
          <Route path="/Labrarory/LabraroryDashboard" element={<LabStart/>}/>
          <Route path="/Labrarory/Labraroryprogress" element={<LabProgress/>}/>
          <Route path="/Labrarory/Labraroryfinish" element={<LabEnd/>}/>
          <Route path="/Labstatus/change/:patientId/MED/:medicalDatadocID" element={<CreateLab/>}/>

        </Routes>



</>

  );
}

export default App;