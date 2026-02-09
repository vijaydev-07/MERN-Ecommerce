import Title from "../components/Title";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80";

const whyChoose = [
  {
    title: "Quality Products",
    desc: "Every piece at Vastraa is crafted with care. We use quality fabrics and pay attention to detail, so you feel comfortable and confident every day.",
  },
  {
    title: "Easy Shopping Experience",
    desc: "Our website is simple to use. Browse, select, and order your favorite styles with ease, from anywhere and at any time.",
  },
  {
    title: "Customer Support",
    desc: "We are here to help. Our support team is ready to answer your questions and assist with orders or returns.",
  },
];

const About = () => (
  <div className="pt-14 pb-12 min-h-[70vh] bg-white">
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1={"ABOUT"} text2={"VASTRAA"} />
      </div>
    </div>
    {/* Hero Section */}
    <div className="max-w-3xl mx-auto text-center mb-8 px-2">
      <p className="text-gray-500 text-base">
        Everyday fashion for modern India.
      </p>
    </div>
    {/* Brand Introduction */}
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-10 px-2">
      <div className="md:w-1/2 w-full">
        <img
          src={ABOUT_IMAGE}
          alt="About Vastraa"
          className="rounded-xl w-full h-64 object-cover object-center shadow-sm"
        />
      </div>
      <div className="md:w-1/2 w-full flex flex-col justify-center">
        <p className="text-gray-700 text-base mb-4">
          Vastraa is an Indian fashion brand offering clothing and accessories for
          everyday life. Our collections are designed for comfort, quality, and
          style, so you can look and feel your best—at work, at home, or out with
          friends.
        </p>
      </div>
    </div>
    {/* Mission */}
    <div className="max-w-3xl mx-auto mb-8 px-2">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h2>
      <p className="text-gray-700 text-base">
        To make good fashion accessible, comfortable, and stylish for everyone.
      </p>
    </div>
    {/* Vision */}
    <div className="max-w-3xl mx-auto mb-10 px-2">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h2>
      <p className="text-gray-700 text-base">
        Vastraa aims to become a trusted name in Indian fashion by focusing on
        quality, simplicity, and customer care. We want to grow with our community
        and adapt to your changing needs.
      </p>
    </div>
    {/* Why Choose Vastraa */}
    <div className="max-w-5xl mx-auto mb-8 px-2">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
        Why Choose Vastraa
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {whyChoose.map((item) => (
          <div
            key={item.title}
            className="flex-1 bg-gray-50 rounded-xl shadow-sm p-6 text-center"
          >
            <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
