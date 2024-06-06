import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const fieldNames = ['allowedTime', 'dischargeTime', 'bedroomNumber'];

const BedRoomUpdate = ({ roomID, onUpdateSuccess, authToken, setShowUpdateForm }) => {
  const [updatedData, setUpdatedData] = useState({
    allowedTime: '',
    dischargeTime: '',
    bedroomNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log('Updating room with ID:', roomID);
      console.log('Updating room with ID:', updatedData);
      const response = await axios.patch(`/api/v1/patient/room/${roomID}`, updatedData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if needed
        },
      });

      // Handle the update success
      console.log('Room updated successfully:', response.data);
      onUpdateSuccess(response.data);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  return (
    <div className='updates'>
      <div className='assign'>
        <h1>Bed Room Update</h1>
        <span className="close" onClick={() => setShowUpdateForm(false)}>
          X
        </span>
      </div>
      <form>
        {fieldNames.map((fieldName) => (
          <div key={fieldName} className="item">
            <label>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
              <input
                type={fieldName === 'bedroomNumber' ? 'number' : 'datetime-local'}
                name={fieldName}
                value={updatedData[fieldName]}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}

        <button type="submit" onClick={handleUpdateSubmit}>
          Update
        </button>
      </form>
    </div>
  );
};

BedRoomUpdate.propTypes = {
  roomID: PropTypes.string.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  setShowUpdateForm: PropTypes.func.isRequired,
};

export default BedRoomUpdate;
