import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav class="bg-transparent">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex justify-between">

                    <div class="flex space-x-4">
                        <div>
                            <Link to="/" class="flex items-center py-4 px-2 text-gray-700 hover:text-gray-900">
                                <img style={{ width: '0.8cm' }} alt="logo" />
                                {/* <span class="font-bold">&nbsp;&nbsp;&nbsp;Student Leave Portal</span> */}
                            </Link>
                        </div>

                        {/* <div class="hidden md:flex items-center space-x-1">
                            <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">Features</a>
                            <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">Pricing</a>
                        </div> */}
                    </div>

                    <div class="hidden md:flex items-center space-x-1">
                        <Link to="/LoginRegister" class="py-2 px-3 mr-5 border-yellow-100 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 transition duration-300">Login</Link>
                        <Link to="/LoginRegister" class="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Signup</Link>
                    </div>

                    <div class="md:hidden flex items-center">
                        <button class="mobile-menu-button">
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* <div class="mobile-menu hidden md:hidden">
                <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Features</a>
                <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</a>
            </div> */}
        </nav>
    )
}

export default Navbar