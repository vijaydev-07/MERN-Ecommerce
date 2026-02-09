import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    removeFromCart,
    placeOrder,
    navigate
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          tempData.push({
            _id: items,
            size,
            quantity: cartItems[items][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const isCartEmpty = cartData.length === 0;

  const handleQuantity = (id, size, value) => {
    if (value < 1) return;
    updateQuantity(id, size, value);
  };

  return (
    <div className="border-t pt-6 px-3 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <div className="mb-4 text-xl sm:text-2xl">
        <Title text1="YOUR" text2="CART" />
      </div>

      {isCartEmpty ? (
        <div className="py-16 text-center text-gray-500 bg-white rounded-lg shadow">
          Your cart is empty
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* PRODUCTS */}
          <div className="w-full lg:w-3/5">
            <div className="flex flex-col gap-4">
              {cartData.map((item, index) => {
                const productData = products.find(
                  (p) => p._id === item._id
                );

                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="flex bg-white rounded-lg shadow border p-3 gap-3"
                  >
                    <img
                      src={productData.imageUrl}
                      alt={productData.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md flex-shrink-0"
                    />

                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-medium text-sm sm:text-base truncate">
                          {productData.name}
                        </p>
                        <button
                          onClick={() =>
                            removeFromCart(item._id, item.size)
                          }
                          className="text-xs text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold">
                          {currency}
                          {Number(productData.price).toFixed(2)}
                        </span>
                        <span className="px-2 text-xs border rounded">
                          {item.size}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            handleQuantity(
                              item._id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 border rounded"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantity(
                              item._id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CART TOTAL */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-xl shadow p-4 sm:p-6 border">
              <CartTotal />

              <button
                onClick={async () => {
                  const orderItems = cartData.map((it) => {
                    const prod =
                      products.find((p) => p._id === it._id) || {};
                    return {
                      productId: it._id,
                      size: it.size,
                      quantity: it.quantity,
                      price: prod.price || 0,
                    };
                  });

                  await placeOrder(orderItems);
                  navigate('/orders');
                }}
                disabled={isCartEmpty}
                className="w-full mt-6 px-6 py-3 text-white bg-black rounded-md disabled:opacity-50"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
