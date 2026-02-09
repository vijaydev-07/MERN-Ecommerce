import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <Link to='/'>
                    <img src="logo.png" className='w-32 mb-5 cursor-pointer' alt="Vastraa" />
                </Link>
                <p className="w-full text-gray-600 md:w-2/3">
                Thank you for shopping with Vastraa. We focus on bringing you quality products and styles that feel right for everyday life. Follow us on social media to stay updated on new arrivals and special offers. If you ever need help, our customer support team is always happy to assist. Subscribe to our newsletter for exclusive discounts and early access to upcoming collections. Your style journey starts here, and we’re glad to be part of it.
                </p>
            </div>

            <div>
                <p className='mb-5 text-xl font-medium'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li>About Us</li>
                    </Link>
                    <Link to='/about'>
                        <li>Delivery</li>
                    </Link>
                    <Link to='/about'>
                        <li>Privacy & Policy</li>
                    </Link>
                </ul>
            </div>

            <div>
                <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+11-558-669-447</li>
                    <li>contact.vastraa@info.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>&copy; {new Date().getFullYear()} Vastraa. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer
