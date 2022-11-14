import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Preloader from '../components/Preloader'
// import '../styles/home.css'
import Navbar from '../components/Navbar'
import logo from '../images/elogo.png'
import Footer from '../components/Footer'
const styles = {
    header: {
        backgroundImage: `url("https://d2rhgiclbu70ed.cloudfront.net/media/filer_public/09/ff/09ff8225-1941-4bdc-8966-bdf93c90b70a/work-detail-page-banner-bg-desktop-muniq.png")`,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    content: {
        height: '100%',
        width: '100%',
    }
}

const Home = () => {

    // var MenuItems = document.getElementById('MenuItems');
    // MenuItems.style.maxHeight = '0px';

    // const menutoggle = () => {
    //     if (MenuItems.style.maxHeight == '0px') {
    //         MenuItems.style.maxHeight = '200px';
    //     } else {
    //         MenuItems.style.maxHeight = '0px';
    //     }
    // }


    const [preloader, setpreloader] = useState(true)

    setTimeout(() => {
        setpreloader(false)
    }, 3000)

    return (
        preloader ? <Preloader /> :

            <>
                <div style={styles.header}>
                    <div style={styles.content}>
                        {/* <Navbar /> */}
                        <br />
                        <div class='flex justify-between'>
                            <img src={logo} style={{ width: '5rem', marginLeft: '10%' }} alt="logo" />
                            <h1 class='mr-20 mt-5 text-4xl font-extrabold text-white'><span class='text-blue-900'>INNO</span> CART</h1>
                        </div>
                        <div class='mt-[8rem]'>
                            <h1 class='text-center text-white text-3xl font-bold'>A new Online Shop experience.</h1>
                            <br />
                            <h1 class='text-center text-white text-3xl font-bold'>Select Your New Perfect Style.</h1>
                        </div>
                        <br />
                        <center>
                            <div>
                                <Link to='/LoginRegister'>
                                    <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                        Login <i class="ml-6 fa-solid fa-arrow-right"></i>
                                    </button>
                                </Link>
                                <Link to='/LoginRegister'>
                                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                            Register <i class="ml-6 fa-solid fa-arrow-right"></i>
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </center>
                    </div>
                </div>

                <section class="text-gray-600 body-font">
                    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                        <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">SoundForm Elite
                                <br class="hidden lg:inline-block" />Hi-Fi Smart Speaker + Wireless Charger
                            </h1>
                            <p class="mb-8 leading-relaxed">The Belkin SoundForm Elite Hi-Fi smart speaker will entertain you with fantastic sound and wirelessly charge your smartphone. The accessory maker teamed up with the experts from Devialet to give the smart speaker remarkable acoustic capabilities. They include the ability to deliver great bass without any unnecessary vibrations.</p>

                        </div>
                        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                            <img class="object-cover object-center rounded" alt="hero" src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1616949568-belkin-smart-speaker-1589580992.jpg?crop=1xw:1xh;center,top&resize=480:*" />
                        </div>
                    </div>
                </section>

                <br />

                <section class="text-gray-600 body-font">
                    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                            <img class="object-cover object-center rounded" alt="hero" src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1635180290-31gXnogBxkL._SL500_.jpg?crop=0.750xw:1xh;center,top&resize=768:*" />
                        </div>
                        <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">QuietComfort 45 Wireless Headphones
                                {/* <br class="hidden lg:inline-block" />readymade gluten */}
                            </h1>
                            <p class="mb-8 leading-relaxed">The Bose QuietComfort 45 wireless headphones, as their model number suggests, are a follow-up to the iconic QuietComfort 35 noise-canceling cans. The new iteration delivers next-level performance, futureproof wireless connectivity, and a USB-C connector for charging.</p>

                        </div>
                    </div>
                </section>


                <section class="text-gray-600 body-font">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="text-center mb-20">
                            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Services Offered</h1>
                            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Look for a provider that offers a reasonable number of monthly or annual text messages and free keywords for your business.</p>
                            <div class="flex mt-6 justify-center">
                                <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                            </div>
                        </div>
                        <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                                <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Real Payment gateway</h2>
                                    <p class="leading-relaxed text-base">A payment gateway is a network through which your customers transfer funds to you. Payment gateways are very similar to the point-of-sale terminals used at most brick and mortar stores. When using a payment gateway, customers and businesses need to work together to make a transaction.</p>

                                </div>
                            </div>
                            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                                <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                        <circle cx="6" cy="6" r="3"></circle>
                                        <circle cx="6" cy="18" r="3"></circle>
                                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                                    </svg>
                                </div>
                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Customized E-Wallet</h2>
                                    <p class="leading-relaxed text-base">E-wallet is a type of pre-paid account in which a user can store his/her money for any future online transaction. An E-wallet is protected with a password. With the help of an E-wallet, one can make payments for groceries, online purchases, and flight tickets, among others.</p>

                                </div>
                            </div>
                            <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                                <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div class="flex-grow">
                                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Available in Web-App  </h2>
                                    <p class="leading-relaxed text-base">A Web application (Web app) is an application program that is stored on a remote server and delivered over the Internet through a browser interface. Web services are Web apps by definition and many, although not all, websites contain Web apps. According to Web.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />

            </>

    )
}

export default Home