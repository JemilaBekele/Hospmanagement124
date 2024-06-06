import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import './ShowUser.scss'
const MedicalAdd = (props) => {
  const [newItem, setNewItem] = useState({
    name: '',
    purchaseDate: '',
   
    price: '',
    quantity: '',
  });

  const endpoint = '/api/v1/medicine';

  const getData = async () => {
    try {
      const response = await axios.get(endpoint);
       response.data;
      // You can use medicine if needed, or remove the setMedicines line
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors if necessary
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post(endpoint, newItem);
      getData();
      setNewItem({
        name: '',
        purchaseDate: '',
       
        price: '',
        quantity: '',
      });
    } catch (error) {
      console.error('Error adding item:', error);
      // Handle errors if necessary
    }
  };

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="data">
      <div className='mo'>
      <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        {/* Add Item Form */}
        <h1>Add Item</h1>
        <form>
  <div className="item">
    <label>Name: </label>
    <input type="text" name="name" value={newItem.name} onChange={handleChange} />
  </div>
  <div className="item">
    <label>Purchase Date: </label>
    <input type="date" name="purchaseDate" value={newItem.purchaseDate} onChange={handleChange} />
  </div>
 
  <div className="item">
    <label>Price: </label>
    <input type="number" name="price" value={newItem.price} onChange={handleChange} />
  </div>
  <div className="item">
    <label>Quantity: </label>
    <input type="number" name="quantity" value={newItem.quantity} onChange={handleChange} />
  </div>

  <button type="button" onClick={handleAddItem}>Add Item</button>
</form>
      </div>


    </div>
  );
};

MedicalAdd.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
export default MedicalAdd;