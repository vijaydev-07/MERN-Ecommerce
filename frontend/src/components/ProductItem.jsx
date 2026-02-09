import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProductItem = ({ id, image, imageUrl, name, price }) => {
  const { currency } = useContext(ShopContext);
  const imgSrc = image || imageUrl || "";

  return (
    <Link
      to={`/product/${id}`}
      className="
        text-gray-700 cursor-pointer 
        flex flex-col items-center
        w-full max-w-[170px] sm:max-w-none
        mx-auto
      "
    >
      {/* Image container */}
      <div
        className="
          w-full aspect-[3/4]
          bg-white
          flex items-center justify-center
          overflow-hidden
        "
      >
        <img
          src={imgSrc}
          alt={name || "Product"}
          className="
            w-full h-full
            object-cover
            transition-transform duration-300
            hover:scale-105
          "
        />
      </div>

      {/* Product name */}
      <p className="pt-3 pb-1 text-sm text-center leading-tight line-clamp-2">
        {name}
      </p>

      {/* Price */}
      <p className="text-sm font-medium text-center">
        {currency}&nbsp;
        {Number(price || 0).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </Link>
  );
};

export default ProductItem;
