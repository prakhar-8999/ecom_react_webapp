import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apihit from '../static/axios'
import staticdata from '../static/staticdata'
const MyCart = () => {

    const navigate = useNavigate()

    const [cart, setcart] = useState([])

    const getcart = () => {
        apihit.get('user/getcart')
            .then(res => {
                console.log(res)
                setcart(res.data)
            })
            .catch(err => {
                console.log(err)
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
            })
    }

    const goIteam = (id) => {
        console.log(id, 'navigation not working')
        navigate(`Item/${id}`)
    }

    useEffect(() => {
        getcart()
    }, [])

    return (
        <>
            <div class="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-1 lg:grid-cols-3">
                {
                    cart.map((c) => (
                        <div class="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" key={c.product_id}>
                            <button>
                                <center><img class="p-8 rounded-t-lg w-full" style={{ width: '100%', height: '8cm' }} src={staticdata.baseurl + 'media/' + c.product_image} alt={c.product_id} /></center>
                            </button>
                            <div class="px-5 pb-5">
                                <a href="#">
                                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{c.product_name}</h5>
                                    <p class="text-gray-500 text-xs tracking-widest title-font mb-1">{c.product_description}</p>
                                </a>
                                <div class="flex items-center mt-2.5 mb-5">
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-3xl font-bold text-gray-900 dark:text-white"><i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>{c.product_price}</span>
                                    {/* <button class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</button> */}
                                </div><br />
                                <div class="grid grid-cols-2 divide-x">
                                    <div>
                                        <button onClick={() => removeitem(c.id)} type="button" class="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Remove</button>
                                    </div>
                                    <div>
                                        <button onClick={() => goIteam(c.id)} type="button" class="w-full focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900">Order</button>
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
                    <button type="button" class="w-full focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900">Place Order</button>
                </div>
            </center>
            <div style={{ display: cart.length === 0 ? 'block' : 'none' }}>
                <p class='text-center text-2xl text-red-600 sm:text-3xl md:text-4xl'>No Items in Cart</p>
            </div>

        </>

    )
}

export default MyCart