import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { currency, orders = [], products = [], cancelItem } = useContext(ShopContext);

  if (!orders || orders.length === 0) {
    return <div className="pt-14 text-center text-gray-600">No orders found</div>;
  }

  const findProduct = (productId) => products.find((p) => p._id === productId) || {};

  return (
    <div className='pt-14'>
      <div className='mb-8'>
        <Title text1={'YOUR'} text2={'ORDERS'} />
      </div>

      <div className='space-y-4'>
        {orders.map((item, idx) => {
          const prod = findProduct(item.productId);
          const img = prod.imageUrl || "";
          const title = prod.name || item.productId;
          const price = Number(item.price || prod.price || 0);
          const orderDate = new Date(item.date || Date.now()).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });

          return (
            <div key={idx} className='flex items-center gap-4 px-6 py-5 border rounded-lg bg-white hover:shadow-md transition'>
              {/* Product Image */}
              <img src={img} alt={title} className='w-20 h-20 object-cover rounded' />

              {/* Product Details */}
              <div className='flex-1'>
                <p className='font-semibold text-gray-800'>{title}</p>
                <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                  <span>{currency}{price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span>Quantity: {item.quantity || 1}</span>
                  <span>Size: {item.size || "-"}</span>
                </div>
                <p className='text-xs text-gray-400 mt-2'>Date: {orderDate}</p>
              </div>

              {/* Status & Cancel Button */}
              <div className='flex flex-col items-end gap-2'>
                <div className='flex items-center gap-2 text-sm text-green-600'>
                  <span className='inline-block w-2 h-2 bg-green-500 rounded-full'></span>
                  <span className='font-medium'>Ready for Shipping</span>
                </div>
                <button
                  onClick={() => cancelItem(idx)}
                  className='px-4 py-2 border border-gray-400 text-sm text-gray-700 rounded hover:bg-gray-50 transition'
                >
                  CANCEL ORDER
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Orders
