import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [Orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    }
  };

  const statusHandler =async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {Orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
            
              <p className='order-item-food'>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>

             
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>

            
              <div className="order-item-address">
                <div>{order.address.street},</div>
                <div>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </div>
              </div>

            
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>

           
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>

           
           <select value={order.status} onChange={(event) => statusHandler(event, order._id, event.target.value)}>
  <option value="Food Processing">Food Processing</option>
  <option value="Out for delivery">Out for delivery</option>
  <option value="Delivered">Delivered</option>
</select>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
