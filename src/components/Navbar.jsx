import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="bg-transparent">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">

                    <div className="flex space-x-4">
                        <div>
                            <Link to="/" className="flex items-center py-4 px-2 text-gray-700 hover:text-gray-900">
                                <img style={{ width: '0.8cm' }} alt="logo" />
                                {/* <span className="font-bold">&nbsp;&nbsp;&nbsp;Student Leave Portal</span> */}
                            </Link>
                        </div>

                        {/* <div className="hidden md:flex items-center space-x-1">
                            <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Features</a>
                            <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Pricing</a>
                        </div> */}
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/LoginRegister" className="py-2 px-3 mr-5 border-yellow-100 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 transition duration-300">Login</Link>
                        <Link to="/LoginRegister" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Signup</Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button className="mobile-menu-button">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* <div className="mobile-menu hidden md:hidden">
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Features</a>
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</a>
            </div> */}
        </nav>
    )
}

export default Navbar