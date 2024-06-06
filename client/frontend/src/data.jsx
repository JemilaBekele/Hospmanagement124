import { MdOutlineDashboard } from 'react-icons/md';  // Material Design icons
import { AiOutlineUser } from 'react-icons/ai';  // Ant Design icons
import { TbReportAnalytics } from 'react-icons/tb';  // Custom icons (hypothetical)
import { FiFolder } from 'react-icons/fi';  // Feather icons
import { AiOutlineHeart } from 'react-icons/ai';  // Ant Design icons
import { RiSettings4Line } from 'react-icons/ri';  // Remix icons
// Import your icon components here

export const sideBarData = [
  { name: 'dashboard', link: '/dashboard', icon: MdOutlineDashboard },
  { name: 'Register', link: '/register', icon: AiOutlineUser },
  { name: 'Doctors', link: '/DoctorView', icon: AiOutlineUser },
  { name: 'MedicalStore', link: '/MedicalStore', icon: TbReportAnalytics, margin: true },
  { name: 'Employee Management', link: '/file-manager', icon: FiFolder },
  { name: 'Profile', link: '/Profile', icon: AiOutlineHeart, margin: true },
  { name: 'Setting', link: '/setting', icon: RiSettings4Line },
];

export const sideBarDataRegister = [
  { name: 'dashboard', link: '/DashboardRception', icon: MdOutlineDashboard },
  { name: 'Patient Register', link: '/PatientRegistrationForm', icon: AiOutlineUser },
  { name: 'Emergency Register', link: '/EmergencyR', icon: AiOutlineUser },
  { name: 'Payment Approval', link: '/PaymentConfirm', icon: TbReportAnalytics, margin: true },
  { name: 'Bed Room', link: '/BedRoom', icon: FiFolder },
  { name: 'Profile', link: '/Profile', icon: AiOutlineHeart, margin: true },
  { name: 'Setting', link: '/setting', icon: RiSettings4Line },
];

export const sideBarDataNurse = [
  { name: 'dashboard', link: '/DashboardRception', icon: MdOutlineDashboard },
  { name: 'patient Data', link: '/nurse/NurseAcceptPatient', icon: MdOutlineDashboard },
  { name: 'Profile', link: '/Profile', icon: AiOutlineHeart, margin: true },
  { name: 'Setting', link: '/setting', icon: RiSettings4Line },
];

export const sideBarDatadoctor = [
  { name: 'dashboard', link: '/Doctor/DoctorDashboard', icon: MdOutlineDashboard },
  { name: 'Patient Data', link: '/Doctor/', icon: MdOutlineDashboard },
  { name: 'Profile', link: '/Profile', icon: AiOutlineHeart, margin: true },
  { name: 'Setting', link: '/setting', icon: RiSettings4Line },
];


export const sideBarDatalab = [
  { name: 'dashboard', link: '/Labrarory/LabraroryDashboard', icon: MdOutlineDashboard },
  { name: 'Profile', link: '/Profile', icon: AiOutlineHeart, margin: true },
  { name: 'Setting', link: '/setting', icon: RiSettings4Line },
];

export const userColumns = [

  {
    field: "firstName",
    headerName: "FirstName",
    width: 230
  },
  {
    field: "lastName",
    headerName: "LastName",
    width: 230,
  },

  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "address",
    headerName: "Address",
    width: 160,


  },
  {
    field: "Salary",
    headerName: "Salary",
    width: 160,


  },
  {
    field: "phoneNumber",
    headerName: "Pho.No",
    width: 160,


  },
];





//export const userRows []