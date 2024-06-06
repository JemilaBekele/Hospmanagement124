import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { authService } from "../../services/authService";
import { sideBarDataRegister } from '../../data';
import './bedroom.scss';
import BedRoomUpdate from './bedroomupdate';

const BedRoomView = () => {
  const { roomID } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const authToken = authService.getToken();

  const fetchRoomData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/patient/room/${roomID}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Add other headers if neededError fetching patient data: 
        },
      });
      setRoomData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching room data:', error);
    }
  }, [authToken, roomID]);

  useEffect(() => {
    fetchRoomData ();
  }, [fetchRoomData ]);

  const handleUpdateSuccess = () => {
    // Callback function to handle update success
    // You might want to refetch patient data or perform other actions
    // For simplicity, you can refetch the patient data
    fetchRoomData ();
    setShowUpdateForm(false); // Hide the update form after a successful update
  };

  if (!roomData) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Navbar />
      <div className='fle'>
        <SideBar sidebarData={sideBarDataRegister} />
        <div>
          <div className="singles">
            <div className="views">
              <div className="info">
                <div className="topInfo">
                  <h1>Bed Room Details</h1>
                  <button onClick={() => setShowUpdateForm(true)}>Update</button>
                </div>
                <div className="details">
                                {Object.entries(roomData.room).map(([key, value]) => (
                  <div key={key} className="item">
                    <p className="itemTitle">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </p>
                    <p className="itemValue">{value}</p>
                  </div>
                ))}

                </div>
              </div>
            </div>
            {showUpdateForm && (
              <div className="updateForm">
                <BedRoomUpdate
                  roomID={roomID}
                  authToken={authToken}
                  onUpdateSuccess={handleUpdateSuccess}
                  setShowUpdateForm= {setShowUpdateForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BedRoomView;
