import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    // Filter only the products marked as best sellers
    const top = products.filter(p => p.bestSeller);
    // Take top 5
    setBestSellers(top.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      {/* Section title */}
      <div className="py-8 text-3xl text-center">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Our best sellers are a hand-picked selection of items loved for their quality, style, and value.
        </p>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
        {bestSellers.map((item, idx) => (
          <ProductItem
            key={idx} // ideally use item._id
            id={item._id}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
