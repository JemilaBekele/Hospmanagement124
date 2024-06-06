import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../Admin/ShowUser';
import { authService } from "../../services/authService";
const BedRoomSee = (props) => {
    const [formData, setFormData] = useState({
        allowedTime: '',
        dischargeTime: '',
        bedroomNumber: '',
        patientID: '',
      });
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = authService.getToken();
        try {
          // Make a POST request to create a hospital room
          const response = await axios.post('/api/v1/patient/room', formData,  {
            headers: {
              Authorization: `Bearer ${authToken}`,
              // Add other headers if neededError fetching patient data: 
            },
          });
    
          // Handle success (you can customize this part based on your needs)
          console.log('Room created successfully:', response.data.room);
    
          // Optionally, you can reset the form after successful submission
          setFormData({
            allowedTime: '',
            dischargeTime: '',
            bedroomNumber: '',
            patientID: '',
          });
        } catch (error) {
          // Handle errors (you can customize this part based on your needs)
          console.error('Error creating room:', error);
        }
      };
    
  return (
    <div className="data">
      <div className='mo'>
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        {/* Add Item Form */}
        <h1>Add Bed</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Allowed Time: </label>
            <input type="datetime-local"
            name="allowedTime"
            value={formData.allowedTime}
            onChange={handleChange}
            required />
          </div>
          <div className="item">
            <label>Discharge Time: </label>
            <input type="datetime-local"
            name="dischargeTime"
            value={formData.dischargeTime}
            onChange={handleChange}
            required />
          </div>
          <div className="item">
            <label>Bed Room Number: </label>
            <input type="number"
            name="bedroomNumber"
            value={formData.bedroomNumber}
            onChange={handleChange}
            required />
          </div>
          <div className="item">
            <label>Patient ID: </label>
            <input  type="text"
            name="patientID"
            value={formData.patientID}
            onChange={handleChange}
            required/>
          </div>

          <button type="submit">Create Room</button>
        </form>
      </div>
    </div>
  );
};

BedRoomSee.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default BedRoomSee;
