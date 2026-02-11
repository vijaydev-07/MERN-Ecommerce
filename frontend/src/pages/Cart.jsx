import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    removeFromCart,
    placeOrder,
    navigate,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // convert cartItems object into simple array
  useEffect(() => {
    const list = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) {
          list.push({
            _id: productId,
            size,
            quantity: qty,
          });
        }
      }
    }

    setCartData(list);
  }, [cartItems]);

  const isEmpty = cartData.length === 0;

  // handle + / - quantity
  const changeQty = (id, size, value) => {
    if (value < 1) return;
    updateQuantity(id, size, value);
  };

  return (
    <div className="border-t pt-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-4 text-xl sm:text-2xl">
        <Title text1="YOUR" text2="CART" />
      </div>

      {isEmpty ? (
        <div className="py-16 text-center text-gray-500 bg-white rounded-lg shadow">
          Your cart is empty
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* cart products */}
          <div className="w-full lg:w-3/5">
            <div className="flex flex-col gap-4">
              {cartData.map((item, idx) => {
                const product = products.find(
                  (p) => p._id === item._id
                );

                if (!product) return null;

                return (
                  <div
                    key={idx}
                    // Optimized padding for small screens
                    className="flex gap-4 p-4 bg-white border rounded-lg shadow-sm"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md bg-gray-100"
                    />

                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        {/* Added break-words to handle long product names */}
                        <p className="font-medium text-sm sm:text-base text-gray-800 break-words leading-tight">
                          {product.name}
                        </p>
                        <button
                          onClick={() =>
                            removeFromCart(item._id, item.size)
                          }
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mt-1.5">
                        <p className="text-sm font-bold text-gray-900">
                          {currency}
                          {Number(product.price).toFixed(2)}
                        </p>
                        <span className="px-2 py-0.5 text-[10px] sm:text-xs border rounded bg-gray-50 text-gray-600 font-medium">
                          {item.size}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() =>
                            changeQty(
                              item._id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center border rounded-full bg-gray-50 hover:bg-gray-100 active:scale-95 transition"
                        >
                          −
                        </button>

                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            changeQty(
                              item._id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center border rounded-full bg-gray-50 hover:bg-gray-100 active:scale-95 transition"
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

          {/* cart total */}
          <div className="w-full lg:w-2/5 mb-10">
            <div className="bg-white border rounded-xl shadow-sm p-5 sm:p-7 sticky top-20">
              <CartTotal />

              <button
                onClick={async () => {
                  const orderItems = cartData.map((it) => {
                    const p =
                      products.find((x) => x._id === it._id) || {};
                    return {
                      productId: it._id,
                      size: it.size,
                      quantity: it.quantity,
                      price: p.price || 0,
                    };
                  });

                  await placeOrder(orderItems);
                  navigate("/orders");
                }}
                disabled={isEmpty}
                className="w-full mt-8 px-6 py-4 text-white bg-black font-medium rounded-md disabled:opacity-50 active:scale-[0.98] transition shadow-lg"
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