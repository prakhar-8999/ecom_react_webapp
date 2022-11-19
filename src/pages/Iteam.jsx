import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Dashloader from '../components/Dashloader'
import apihit from '../static/axios'
import staticdata from '../static/staticdata'
import Swal from 'sweetalert2'
import Alert from '../static/Alert'
import logo from '../images/elogo.png'
const Iteam = () => {

    const { pdid } = useParams()
    const [pdata, setpadat] = useState({})
    const [wallet, setwallet] = useState({})
    const [user, setuser] = useState({})
    const [loader, setloader] = useState(true)
    const [btnloader, setbtnloader] = useState(false)


    const navigate = useNavigate()

    const userdetails = () => {
        apihit.get('user/details')
            .then(res => {
                console.log(res);
                setuser(res.data)
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }


    const getperticularproduct = () => {
        apihit.post('user/getperticularproduct', { id: pdid })
            .then(res => {
                console.log(res);
                setpadat(res.data)
                setloader(false)
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }

    const placeOrder = () => {
        setbtnloader(true)
        apihit.post('user/genorder', { pdid: pdid })
            .then(res => {
                console.log(res)
                payorder(res.data)
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }


    const payorder = (payd) => {

        var options = {
            "key": staticdata.paykey, // Enter the Key ID generated from the Dashboard
            "amount": payd.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Ecom Services",
            "description": "Test Transaction",
            "image": { logo },
            "order_id": payd.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "handler": function (response) {
                console.log(response);
                setbtnloader(false)
                apihit.post('user/orderdone', { odid: response.razorpay_order_id, payid: response.razorpay_payment_id, signid: response.razorpay_signature, amount: payd.amount, product_name: pdata.product_name, product_id: pdata.product_id, product_price: pdata.product_price, product_quantity: pdata.product_quantity })
                    .then(res => {
                        console.log(res);
                        setbtnloader(false)
                        navigate("/Dashboard/orders")
                        Swal.fire({
                            icon: 'success',
                            text: res.data.msg,
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        setbtnloader(false)
                        Alert(err.response.status, err.response.data.msg)
                    })
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
            },
            "prefill": {
                "name": user.Name,
                "email": user.Email,
                "contact": user.Phone
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        console.log(options);

        var rzp1 = new window.Razorpay(options);

        rzp1.open();

        rzp1.on('payment.failed', function (response) {
            setbtnloader(false)
            Swal.fire({
                icon: 'error',
                title: 'Transaction Failed',
                text: response.error.description,
            })
        })
    }


    const getwallet = () => {
        apihit.get('user/wallet')
            .then(res => {
                console.log(res);
                setwallet(res.data)
                setloader(false)
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }

    const payviawallet = () => {
        apihit.post('user/payviawallet', { id: pdid })
            .then(res => {
                console.log(res);
                document.getElementById('close-payment-modal').click()
                navigate("/Dashboard/orders")
                Alert(res.status, res.data.msg)

            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }



    useEffect(() => {
        getperticularproduct()
        userdetails()
        getwallet()
    }, [])

    return (
        loader ? <Dashloader /> :
            <>
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" src={staticdata.baseurl + 'media/' + pdata.product_image} />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">{pdata.product_id}</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{pdata.product_name}</h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span className="text-gray-600 ml-3">4 Reviews</span>
                                    </span>
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                        <button className="text-gray-500">
                                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                            </svg>
                                        </button>
                                        <button className="text-gray-500">
                                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                            </svg>
                                        </button>
                                        <button className="text-gray-500">
                                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                                <p className="leading-relaxed">{pdata.product_description}</p>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                    {/* <div className="flex">
                                    <span className="mr-3">Color</span>
                                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                            <option>SM</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div> */}
                                </div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900"><i className="fa-sharp fa-solid fa-indian-rupee-sign"></i> &nbsp;{pdata.product_price}</span>
                                    <div className="hs-dropdown relative inline-flex">
                                        <button id="hs-dropdown-with-title" className="flex ml-4 text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Place Order{btnloader ? <i className="fas fa-circle-notch fa-spin" style={{ marginLeft: "20px" }} /> : null}</button>
                                        <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700" aria-labelledby="hs-dropdown-with-title">
                                            <div className="py-2 first:pt-0 last:pb-0">
                                                <span className="block py-2 px-3 text-sm font-medium uppercase text-gray-900 dark:text-gray-500">
                                                    Payment Process
                                                </span>
                                                <p className='text-xs py-2 px-3'>Pay via E-Wallet</p>
                                                <button type="button" className="mt-2 w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2" data-hs-overlay="#hs-vertically-centered-modal">
                                                    <img src={logo} alt="logo" className='w-6 mr-3' />
                                                    Check out with E-Wallet
                                                </button>
                                            </div>
                                            <div className="py-2 first:pt-0 last:pb-0">
                                                <p className='text-xs py-2 px-3'>Pay via Payment Gateway</p>
                                                <button type="button" onClick={placeOrder} className="w-full mt-2 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
                                                    <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
                                                    Check out with Razorpay
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="hidden md:block rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




                <div id="hs-vertically-centered-modal" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                        <div className="w-[40rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                                <h3 className="font-bold text-gray-800 dark:text-white">
                                    Payment via Wallet
                                </h3>
                                <button type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto">
                                <p className="text-gray-900 font-bold dark:text-gray-400">
                                    Wallet Details ....
                                </p>
                                <br /><br />
                                <div className="grid grid-cols-2 divide-x divide-green-900">
                                    <div>
                                        <span className="text-2xl font-semibold" style={{ float: 'left' }}>Balance</span>

                                    </div>
                                    <div><span className="text-3xl mr-6 font-semibold" style={{ float: 'right', color: wallet.balance < 100 ? 'red' : 'green' }}>{wallet.balance}</span></div>
                                </div><br /><br />
                                <center>
                                    <span style={{ display: pdata.product_price > wallet.balance ? 'block' : 'none' }} className='text-center text-red-700'>You have insuffient balance in your wallet.</span>
                                </center>
                                <br />
                                <button style={{ backgroundColor: pdata.product_price > wallet.balance ? '#867979' : null }} disabled={pdata.product_price > wallet.balance} onClick={payviawallet} type="button" className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                    <span>Confirm and Pay</span>
                                </button>
                            </div>
                            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                                <button id='close-payment-modal' type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>





            </>
    )
}

export default Iteam
