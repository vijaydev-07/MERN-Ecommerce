import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  // products list context se aa rahi hai
  const { products } = useContext(ShopContext);

  // same category + subCategory ke products
  // current product ko hata diya
  const related = products
    .filter(
      (item) =>
        item.category === category &&
        item.subCategory === subCategory &&
        item._id !== currentProductId
    )
    // max 6 products show karne ke liye
    .slice(0, 6);

  return (
    <div className="my-16 px-4">
      {/* heading */}
      <div className="py-2 text-2xl text-center">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      {/* products grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {related.map((item) => (
          <div key={item._id} className="w-full">
            {/* single product card */}
            <ProductItem
              id={item._id}
              name={item.name}
              image={item.image}
              imageUrl={item.imageUrl}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
