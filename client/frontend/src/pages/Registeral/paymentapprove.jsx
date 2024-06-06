import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataRegister } from '../../data';
import Labresult from "./Labresult";


const PaymentApprove = () => {
    return (
       
            <section>
                <Navbar />
                <div className='flex'>
                    <SideBar sidebarData={sideBarDataRegister} />
                    
                   <Labresult />
                    
                </div>
            </section>
       
    );
};

export default PaymentApprove;
