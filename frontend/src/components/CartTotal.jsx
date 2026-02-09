import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Cart ka subtotal
  const subTotal = getCartAmount();

  // Agar cart empty hai to total 0, warna delivery fee add hogi
  const totalAmount = subTotal === 0 ? 0 : subTotal + delivery_fee;

  return (
    <div className="w-full">
      {/* Section heading */}
      <div className="text-2xl">
        <Title text1="CART" text2="TOTAL" />
      </div>

      {/* Price details */}
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Sub total */}
        <div className="flex justify-between">
          <p className="text-lg font-medium">Sub Total</p>
          <p className="text-lg font-medium">
            {currency}&nbsp;
            {subTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <hr />

        {/* Shipping fee */}
        <div className="flex justify-between">
          <p className="text-lg font-medium">Shipping Fee</p>
          <p className="text-lg font-medium">
            {currency}&nbsp;
            {delivery_fee.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <hr />

        {/* Final total */}
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">Total Amount</p>
          <p className="text-2xl font-semibold">
            {currency}&nbsp;
            {totalAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
