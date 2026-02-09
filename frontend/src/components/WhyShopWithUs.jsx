import { FaShippingFast, FaLock, FaTags, FaUndoAlt } from "react-icons/fa";

const benefits = [
  {
    icon: <FaShippingFast size={32} className="mx-auto text-blue-600" />,
    title: "Fast Delivery",
    desc: "Get your orders delivered quickly and safely to your doorstep.",
  },
  {
    icon: <FaLock size={32} className="mx-auto text-green-600" />,
    title: "Secure Payments",
    desc: "Shop with confidence using our secure payment options.",
  },
  {
    icon: <FaTags size={32} className="mx-auto text-orange-500" />,
    title: "Exclusive Offers",
    desc: "Enjoy special discounts and deals on top products.",
  },
  {
    icon: <FaUndoAlt size={32} className="mx-auto text-purple-600" />,
    title: "Easy Returns",
    desc: "Hassle-free returns and exchanges within 10 days.",
  },
];

export default function WhyShopWithUs() {
  return (
    <div className="py-12 bg-gray-50 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Why Shop With <span className="text-orange-500">Vastraa?</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 w-64 flex flex-col items-center"
          >
            {b.icon}
            <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center">{b.title}</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
