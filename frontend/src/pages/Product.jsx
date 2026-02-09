import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import Title from "../components/Title";
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, backendUrl, addToCart, placeOrder, currency, isItemInCart } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    let mounted = true;

    const findLocal = () => products.find((p) => p._id === productId);

    const getFirstImage = (p) => {
      if (!p) return (assets && assets.placeholder) || "";
      let imageUrl = p.imageUrl || p.image || "";
      if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
        const base = backendUrl ? backendUrl.replace(/\/$/, "") : "";
        if (base) {
          imageUrl = imageUrl.startsWith("/") ? `${base}${imageUrl}` : `${base}/${imageUrl}`;
        }
      }
      return imageUrl || (assets && assets.placeholder) || "";
    };

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const local = findLocal();
        if (local) {
          if (!mounted) return;
          setProduct(local);
          setImage(getFirstImage(local));
          setLoading(false);
          return;
        }
        if (!backendUrl) {
          if (!mounted) setLoading(false);
          setProduct(null);
          return;
        }
        const res = await axios.get(`${backendUrl}/api/product/${productId}`);
        if (!mounted) return;
        if (res.data?.success && res.data.product) {
          setProduct(res.data.product);
          setImage(getFirstImage(res.data.product));
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Fetch product error:", err);
        setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      mounted = false;
    };
  }, [productId, products, backendUrl]);

  if (loading) return <div className="pt-14 text-center">Loading...</div>;
  if (!product) return <div className="pt-14 text-center text-gray-600">Product not found</div>;

  // Safe guards - imageUrl is a string
  const imageSrc = (() => {
    let img = product.imageUrl || product.image || "";
    if (img && !/^https?:\/\//i.test(img)) {
      const base = backendUrl ? backendUrl.replace(/\/$/, "") : "";
      if (base) img = img.startsWith("/") ? `${base}${img}` : `${base}/${img}`;
    }
    return img || (assets && assets.placeholder) || "";
  })();
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const mainImage = image || imageSrc;

const handleAddToCart = () => {
  if (!user) {
    navigate("/login");
    return;
  }

  if (!size) {
    toast.error("Please select a size");
    return;
  }

  // bas add ya quantity badhao
  addToCart(product._id, size);
};


  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    const orderItem = {
      productId: product._id,
      size,
      quantity: 1,
      price: product.price
    };
    await placeOrder([orderItem]);
    toast.success("Order placed");
    navigate('/orders');
  };

  return (
    <div className='pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100 w-full max-w-6xl mx-auto'>
      {/* Product Data */}
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        {/* Product Images */}
        <div className='flex flex-col-reverse flex-1 gap-3 sm:flex-row'>
          <div className='flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full'>
            <img 
              src={mainImage || ((assets && assets.placeholder) || "")} 
              key="single"
              onClick={() => setImage(mainImage)}
              className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 border-gray-600 py-2 px-2`} 
              alt={`Product`} 
            />
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={mainImage || ((assets && assets.placeholder) || "")} className='w-full h-auto' alt={product?.name || "Product"} />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='mt-2 text-2xl font-medium'>{product.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="Ratings" className="w-3" />
            <img src={assets.star_icon} alt="Ratings" className="w-3" />
            <img src={assets.star_icon} alt="Ratings" className="w-3" />
            <img src={assets.star_icon} alt="Ratings" className="w-3" />
            <img src={assets.star_dull_icon} alt="Ratings" className="w-3" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{Number(product.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {(sizes || []).length === 0 ? (
                <p className="text-gray-500">Size not available</p>
              ) : (
                (sizes || []).map((item, index) => (
                  <button 
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 rounded-md ${item === size ? 'border-orange-500' : ''}`}
                  >
                    {item}
                  </button>
                ))
              )}
            </div>
          </div>
          <div className='flex gap-3 mt-4'>
            <button
              onClick={handleAddToCart}
              className='px-8 py-3 text-sm text-white bg-black active:bg-gray-700'
            >
              ADD TO CART
            </button>
            <button
              onClick={handleBuyNow}
              className='px-6 py-3 text-sm text-white bg-orange-500 active:bg-orange-600'
            >
              BUY NOW
            </button>
          </div>
          <hr className='mt-8 sm:w-4/5' />
          <div className='flex flex-col gap-1 mt-5 text-sm text-gray-500'>
            <p>Guaranteed 100% Authentic – Shop with Confidence!</p>
            <p>Enjoy Cash on Delivery – Pay at Your Doorstep!</p>
            <p>Hassle-Free Returns & Exchanges – 10 Days, No Questions Asked!</p>
          </div>
        </div>
      </div>
      {/* Description and Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='px-5 py-3 text-sm border'>Description</b>
          <p className='px-5 py-3 text-sm border'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border'>
          <p>Elevate your style with our meticulously crafted Trendify quality products. Designed with a perfect balance of elegance and practicality, these Trendify quality products made from premium materials that ensure both durability and comfort.</p>
          <p>Whether you're dressing up for a special occasion or adding a touch of sophistication to your everyday look, the Trendify quality products offer unparalleled versatility. Its timeless design, coupled with a flawless fit, makes it a must-have addition to any wardrobe. Don't miss out on the chance to own a piece that combines both form and function—experience the difference today.</p>
        </div>
      </div>
      {/* Display Related Products */}
      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
        currentProductId={product._id}
      />
    </div>
  );
};

export default Product;
