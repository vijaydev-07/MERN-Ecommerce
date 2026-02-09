import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Title from "../components/Title";

const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"; // Use a premium, workspace/fashion vibe image

const Contact = () => (
  <div className="pt-14 pb-12 bg-white min-h-[70vh]">
    {/* Title */}
    <div className="mb-3 text-2xl text-center">
      <Title text1={"CONTACT"} text2={"US"} />
    </div>
    {/* Header */}
    <div className="text-center mb-10">
      <p className="text-gray-500 text-base">
        We’re here to help with orders, sizing, and support
      </p>
    </div>
    {/* Main Content */}
    <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto bg-white rounded-xl shadow-md p-0 md:p-6">
      {/* Left: Image */}
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <img
          src={CONTACT_IMAGE}
          alt="Vastraa workspace"
          className="rounded-xl w-full h-72 md:h-[340px] object-cover object-center shadow-sm"
        />
      </div>
      {/* Right: Store Info */}
      <div className="md:w-1/2 w-full flex flex-col justify-center px-4 py-6 md:py-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Store</h2>
        <div className="flex items-start gap-3 mb-3">
          <FaMapMarkerAlt className="text-gray-400 mt-1" />
          <span className="text-gray-700">
            Vastraa
            <br />
            354 Fashion Lane
            <br />
            Los Angeles, SC 45678, USA
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <FaPhoneAlt className="text-gray-400" />
          <span className="text-gray-700">(+11)-558-669-447</span>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <FaEnvelope className="text-gray-400" />
          <span className="text-gray-700">contact.vastraa@info.com</span>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
          <p className="text-gray-500 text-sm">
            For help with your order, sizing, or returns, please email or call us.
            Our team is available Mon–Sat, 9am–7pm.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
