import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  // product id from URL
  const { productId } = useParams();
  const navigate = useNavigate();

  // data from contexts
  const {
    products,
    backendUrl,
    addToCart,
    placeOrder,
    currency,
  } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  // local states
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // fetch product data
  useEffect(() => {
    let mounted = true;

    // find product from local store
    const findLocal = () => products.find((p) => p._id === productId);

    // safe image resolver
    const getImage = (p) => {
      if (!p) return assets?.placeholder || "";
      let img = p.imageUrl || p.image || "";
      if (img && !/^https?:\/\//i.test(img)) {
        const base = backendUrl?.replace(/\/$/, "");
        if (base) img = img.startsWith("/") ? `${base}${img}` : `${base}/${img}`;
      }
      return img || assets?.placeholder || "";
    };

    const fetchProduct = async () => {
      setLoading(true);
      try {
        // try local first
        const local = findLocal();
        if (local) {
          if (!mounted) return;
          setProduct(local);
          setImage(getImage(local));
          setLoading(false);
          return;
        }

        // if no backend
        if (!backendUrl) {
          setProduct(null);
          setLoading(false);
          return;
        }

        // fetch from backend
        const res = await axios.get(`${backendUrl}/api/product/${productId}`);
        if (!mounted) return;

        if (res.data?.success) {
          setProduct(res.data.product);
          setImage(getImage(res.data.product));
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
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

  // loading state
  if (loading) return <div className="pt-14 text-center">Loading...</div>;
  if (!product)
    return (
      <div className="pt-14 text-center text-gray-600">
        Product not found
      </div>
    );

  // image + sizes safe guards
  const mainImage = image || assets?.placeholder || "";
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];

  // add to cart
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    addToCart(product._id, size);
  };

  // buy now
  const handleBuyNow = async () => {
    if (!user) {
      navigate("/login");
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
      price: product.price,
    };

    await placeOrder([orderItem]);
    toast.success("Order placed");
    navigate("/orders");
  };

  return (
    <div className="pt-10 border-t-2 max-w-6xl mx-auto">
      
      {/* PRODUCT SECTION */}
      <div className="flex flex-col gap-12 sm:flex-row">
        
        {/* IMAGES */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="sm:w-[20%]">
            <img
              src={mainImage}
              onClick={() => setImage(mainImage)}
              className="cursor-pointer border p-2"
              alt="Product"
            />
          </div>
          <div className="sm:w-[80%]">
            <img src={mainImage} className="w-full" alt={product.name} />
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{product.name}</h1>

          {/* price */}
          <p className="mt-4 text-3xl font-medium">
            {currency}
            {Number(product.price).toLocaleString()}
          </p>

          {/* description */}
          <p className="mt-5 text-gray-500">{product.description}</p>

          {/* sizes */}
          <div className="my-8">
            <p className="mb-2">Select Size</p>
            <div className="flex gap-2">
              {sizes.length === 0 ? (
                <p className="text-gray-500">Size not available</p>
              ) : (
                sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 border rounded ${
                      s === size ? "border-orange-500" : ""
                    }`}
                  >
                    {s}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 text-white bg-black"
            >
              ADD TO CART
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-3 text-white bg-orange-500"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
        currentProductId={product._id}
      />
    </div>
  );
};

export default Product;
