import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apihit from '../static/axios'
import staticdata from '../static/staticdata'
import Dashloader from '../components/Dashloader'
import Swal from 'sweetalert2'
import Alert from '../static/Alert'
const MyCart = () => {

    const navigate = useNavigate()

    const [cart, setcart] = useState([])
    const [loader, setloader] = useState(true)
    const [btnloader, setbtnloader] = useState(false)
    const [user, setuser] = useState({})

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



    const getcart = () => {
        apihit.get('user/getcart')
            .then(res => {
                console.log(res)
                setcart(res.data)
                setloader(false)
            })
            .catch(err => {
                console.log(err)
                Alert(err.response.status, err.response.data.msg)
            })
    }

    const removeitem = (id) => {
        apihit.post('user/removecart', { id: id })
            .then(res => {
                console.log(res);
                getcart()
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }

    const goIteam = (id) => {
        console.log(id, 'navigation not working')
        navigate(`Item/${id}`)
    }


    const setquantity = (q, uid, pid) => {
        console.log({ quantity: q, user: uid, product_id: pid });
        apihit.post('user/changequantity', { quantity: q, user: uid, product_id: pid })
            .then(res => {
                console.log(res);
                getcart()
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })

    }

    const orderAll = () => {
        setbtnloader(true)
        apihit.get('user/orderall')
            .then(res => {
                console.log(res);
                payorder(res.data)
            })
            .catch(err => {
                console.log(err);
                setbtnloader(false)
                Alert(err.response.status, err.response.data.msg)
            })
    }

    const payorder = (payd) => {

        var options = {
            "key": staticdata.paykey,
            "amount": payd.amount,
            "currency": "INR",
            "name": "Ecom Services",
            "description": "Test Transaction",
            "image": "https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr",
            "order_id": payd.id,
            "handler": function (response) {
                console.log(response);
                setbtnloader(false)
                apihit.post('user/allordercomplete', { odid: response.razorpay_order_id, payid: response.razorpay_payment_id, signid: response.razorpay_signature, amount: payd.amount })
                    .then(res => {
                        console.log(res);
                        setbtnloader(false)
                        Swal.fire({
                            icon: 'success',
                            text: res.data.msg,
                        })
                        getcart()
                    })
                    .catch(err => {
                        console.log(err);
                        setbtnloader(false)
                        Alert(err.response.status, err.response.data.msg)
                    })
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





    useEffect(() => {
        getcart()
        userdetails()
    }, [])

    return (
        loader ? <Dashloader /> :
            <>
                <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-1 lg:grid-cols-3">
                    {
                        cart.map((c) => (
                            <div className="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" key={c.product_id}>
                                <button>
                                    <center><img className="p-8 rounded-t-lg w-full" style={{ width: '100%', height: '8cm' }} src={staticdata.baseurl + 'media/' + c.product_image} alt={c.product_id} /></center>
                                </button>
                                <div className="px-5 pb-5">
                                    <div href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{c.product_name}</h5>
                                        <p className="text-gray-500 text-xs tracking-widest title-font mb-1">{c.product_description}</p>
                                    </div>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white"><i className="fa-sharp fa-solid fa-indian-rupee-sign"></i>{c.product_price}</span>
                                        <div className="w-[10rem] mt-6 relative mb-6">
                                            <select onChange={(e) => setquantity(e.target.value, c.userid, c.product_id)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>{c.product_quantity}</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                        </div>
                                        {/* <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</button> */}
                                    </div><br />
                                    <div className="grid grid-cols-2 divide-x">
                                        <div>
                                            <button onClick={() => removeitem(c.id)} type="button" className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Remove</button>
                                        </div>
                                        <div>
                                            <button onClick={() => goIteam(c.id)} type="button" className="w-full focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900">Order</button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        ))
                    }


                </div>

                <br /><br />
                <center>
                    <div style={{ width: '100%', display: cart.length === 0 ? 'none' : 'block' }}>
                        <button onClick={orderAll} type="button" className="w-full focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900">Place Order{btnloader ? <i className="fas fa-circle-notch fa-spin" style={{ marginLeft: "20px" }} /> : null}</button>
                    </div>
                </center>
                <div style={{ display: cart.length === 0 ? 'block' : 'none' }}>
                    <p className='text-center text-2xl text-red-600 sm:text-3xl md:text-4xl'>No Items in Cart</p>
                </div>

            </>

    )
}

export default MyCart