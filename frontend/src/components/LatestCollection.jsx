import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();

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

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {products.slice(0, 10).map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="cursor-pointer group transition-transform duration-200 hover:scale-[1.04]"
          >
            {/* Image */}
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Price */}
            <div className="mt-3 text-center">
              <p className="text-[13px] sm:text-sm font-medium text-gray-800 line-clamp-1">
                {item.name}
              </p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                ₹ {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW MORE BUTTON */}
      <div className="flex justify-center mt-12 mb-5">
        <button
          onClick={() => navigate("/collection")}
          className="px-10 py-3 bg-black text-white text-sm font-medium rounded-sm uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 active:scale-95 shadow-md"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default LatestCollection;