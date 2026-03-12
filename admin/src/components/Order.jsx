import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const url = `${API_URL}/api/orders`;

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/getall`);
      if (response.data) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.put(`${url}/getall/${orderId}`, {
        status: event.target.value
      });
      if (response.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='p-8 bg-[#1a1a1a] min-h-screen text-white'>
      <div className='mx-auto max-w-7xl'>
        <h2 className='text-3xl font-bold text-[#ff9800] text-center mb-8 uppercase tracking-widest'>Order Management</h2>
        
        <div className='bg-[#2c2c2c] rounded-xl overflow-hidden shadow-2xl border border-[#3d3d3d]'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-[#333333] border-b border-[#444444]'>
                  <th className='px-6 py-4 text-[#ff9800] font-semibold uppercase text-sm tracking-tighter'>Customer</th>
                  <th className='px-6 py-4 text-[#ff9800] font-semibold uppercase text-sm tracking-tighter'>Address</th>
                  <th className='px-6 py-4 text-[#ff9800] font-semibold uppercase text-sm tracking-tighter'>Items</th>
                  <th className='px-6 py-4 text-[#ff9800] font-semibold uppercase text-sm tracking-tighter text-center'>Total Items</th>
                  <th className='px-6 py-4 text-[#ff9800] font-semibold uppercase text-sm tracking-tighter'>Price</th>
                  <th className='px-6 py-4 text-[#ff9800] font-semibold uppercase text-sm tracking-tighter'>Payment</th>
                  <th className='px-6 py-4 text-[#ff9800] font-semibold uppercase text-sm tracking-tighter'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-[#3d3d3d]'>
                {orders.map((order, index) => (
                  <tr key={index} className='hover:bg-[#383838] transition-colors duration-200'>
                    <td className='px-6 py-4 font-medium'>
                      {order.firstName} {order.lastName}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-300 max-w-xs truncate'>
                      {order.address}, {order.city}, {order.zipCode}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-300'>
                      {order.items.map((item, i) => (
                        <div key={i}>
                          {item.item.name} x {item.quantity}
                          {i !== order.items.length - 1 ? ',' : ''}
                        </div>
                      ))}
                    </td>
                    <td className='px-6 py-4 text-center text-sm font-semibold'>
                      {order.items.length}
                    </td>
                    <td className='px-6 py-4 text-sm font-bold text-[#4caf50]'>
                      ₹{order.total}
                    </td>
                    <td className='px-6 py-4 text-sm'>
                       <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${order.paymentStatus === 'succeeded' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {order.paymentMethod === 'online' ? 'Online' : 'COD'} - {order.paymentStatus}
                       </span>
                    </td>
                    <td className='px-6 py-4'>
                      <select 
                        onChange={(event) => statusHandler(event, order._id)} 
                        value={order.status}
                        className='bg-[#3d3d3d] text-white text-sm rounded-lg focus:ring-[#ff9800] focus:border-[#ff9800] block w-full p-2.5 border-none outline-none cursor-pointer hover:bg-[#4d4d4d] transition-colors'
                      >
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <div className='p-8 text-center text-gray-400'>
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Order
