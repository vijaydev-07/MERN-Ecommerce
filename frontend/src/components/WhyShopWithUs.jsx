import { FaShippingFast, FaTags, FaFire, FaCheckCircle } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";

const benefits = [
  {
    icon: <FaShippingFast size={32} className="mx-auto text-blue-600" />,
    title: "Fast Delivery",
    desc: "Get your favorite styles delivered quickly to your doorstep.",
  },
  {
    // Secure Payment ki jagah Quality Assurance ya Verified Products
    icon: <FaCheckCircle size={32} className="mx-auto text-green-600" />,
    title: "Verified Quality",
    desc: "Every product is hand-picked to ensure the best quality for you.",
  },
  {
    icon: <FaTags size={32} className="mx-auto text-orange-500" />,
    title: "Exclusive Offers",
    desc: "Enjoy special discounts and deals on our top collections.",
  },
  {
    // Easy Returns ki jagah Latest Trends
    icon: <FaFire size={32} className="mx-auto text-red-500" />,
    title: "Modern Trends",
    desc: "Stay ahead of the fashion curve with our weekly updated styles.",
  },
];

export default function WhyShopWithUs() {
  return (
    <div className="py-12 bg-white mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-10">
        Why Shop With <span className="text-orange-500">Vastraa?</span>
      </h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {benefits.map((b, i) => (
          <div key={i} className="flex flex-col items-center p-2">
            <div className="mb-4">
               {b.icon}
            </div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 text-center uppercase tracking-wide">
              {b.title}
            </h3>
            <p className="mt-2 text-[10px] sm:text-sm text-gray-500 text-center leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}