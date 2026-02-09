import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory &&
          item._id !== currentProductId
      )
      setRelated(filtered.slice(0, 6))
    }
  }, [products, category, subCategory, currentProductId])

  return (
    <div className="my-16 px-4">
      <div className="py-2 text-2xl text-center">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      {/* IMPORTANT FIX */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {related.map((item) => (
          <div key={item._id} className="w-full">
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
  )
}

export default RelatedProducts
