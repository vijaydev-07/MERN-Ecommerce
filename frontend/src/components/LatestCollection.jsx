import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10 px-3 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      {/* Heading */}
      <div className="py-6 text-center">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          Step into a world of style with our newest collections, carefully
          curated to bring you the best in fashion, home decor, and more.
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {latestProducts.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}

            className="cursor-pointer group transition-transform duration-200 hover:scale-[1.04]"
          >
            {/* Image */}
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Price (same look) */}
            <div className="mt-2 text-center">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-sm text-gray-700 mt-1">
                ₹ {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
