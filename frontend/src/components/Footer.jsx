import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        {/* mt-10 space fix karne ke liye */}
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-10 text-sm'>
            
            {/* Logo and Description */}
            <div className='mb-8 sm:mb-0'>
                <Link to='/'>
                    <img src="logo.png" className='w-32 mb-5 cursor-pointer' alt="Vastraa" />
                </Link>
                <p className="w-full text-gray-600 md:w-2/3 leading-relaxed">
                Thank you for shopping with Vastraa. We focus on bringing you quality products and styles that feel right for everyday life. Follow us on social media to stay updated on new arrivals and special offers.
                </p>
            </div>

            {/* Side-by-side on mobile, no boxes */}
            <div className='flex justify-between sm:contents gap-4'>
                
                {/* COMPANY SECTION */}
                <div>
                    <p className='mb-5 text-lg font-medium'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                          <Link to='/'><li>Home</li></Link>
                          <Link to='/collection'><li>Our Collection</li></Link>
                          <Link to='/about'><li>About Us</li></Link>
                          <Link to='/contact'><li>Contact Us</li></Link>
                    </ul>
                </div>

                {/* GET IN TOUCH SECTION */}
                <div>
                    <p className='mb-5 text-lg font-medium'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+11-558-669-447</li>
                        <li>contact.vastraa@info.com</li>
                    </ul>
                </div>

            </div>
        </div>

        <div>
            <hr className='border-gray-200' />
            <p className='py-5 text-sm text-center text-gray-500'>&copy; {new Date().getFullYear()} Vastraa. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer