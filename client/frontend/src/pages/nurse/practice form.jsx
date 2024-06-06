import { Textarea, Label, TextInput } from "flowbite-react";
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarDataNurse } from '../../data';
const UploadBook = () => {

    return(
        <section>
        <Navbar />
        <div className='flex'>
          <SideBar sidebarData={sideBarDataNurse} />
        <div className= 'px-3 my-12 ' style={{ textAlign: 'left' }} >
          
          <h2 className= 'mb-8 text-3xl font-bold'>Upload File</h2>
          <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" > 
    <div className="flex gap-8" >
    <div className="lg:w-1/3  " >
        <div className="mb-2  " >
          <Label  htmlFor="book" value="Your book1" />
        </div>
        <TextInput id="book" name= 'book'type="text" placeholder="enter book" required />
      </div>
      <div className="lg:w-1/3">
        <div className="mb-2 ">
          <Label htmlFor="book" value="Your book1" />
        </div>
        <TextInput id="book" name= 'book'type="text" placeholder="enter book" required />
      </div>
   
     
    </div>
      
    <div className="flex gap-8">
    <div className="lg:w-1/3">
        <div className="mb-2 ">
          <Label htmlFor="book" value="Your book1" />
        </div>
        <TextInput id="book" name= 'book'type="text" placeholder="enter book" required />
      </div>
      <div className="lg:w-1/3">
        <div className="mb-2 ">
          <Label htmlFor="book" value="Your book1" />
        </div>
        <Textarea id="book" name= 'book'type="text" placeholder="enter book" required />
      </div>
   
     
    </div>     
    </form>
        </div>  </div>
    </section>
    )

}

export default UploadBook