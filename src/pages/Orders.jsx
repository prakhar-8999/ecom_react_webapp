import React, { useEffect, useState } from 'react'
import Dashloader from '../components/Dashloader'
import apihit from '../static/axios'
import staticdata from '../static/staticdata'
import Alert from '../static/Alert'

const Orders = () => {

    const [orders, setorders] = useState([])
    const [loader, setloader] = useState(true)
    const [search, setsearch] = useState('')
    const getorders = () => {
        apihit.get('user/getorders')
            .then(res => {
                console.log(res);
                setorders(res.data)
                setloader(false)
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }

    useEffect(() => {
        getorders()
    }, [])


    return (
        loader ?

            <Dashloader /> :

            <>
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input onChange={e => setsearch(e.target.value)} type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your orders" required />
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
                <br />
                {
                    orders.filter(any => any.product_name.includes(search)).map((o, index) => (
                        <>
                            <button key={index} class='w-full'>
                                <div class="p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                        <div class="grid grid-cols-1 md:grid-cols-3">
                                            <img style={{ width: '4cm', height: '4cm' }} src={staticdata.baseurl + '/media/' + o.product_image} alt={o.product_image} />
                                            <div>
                                                <p class='opacity-60 text-sm' style={{ float: 'left' }}>{o.product_id}</p><br />
                                                <p class='text-xl' style={{ float: 'left' }}><b>{o.product_name.toLowerCase()}</b></p><br /><br />
                                                <p style={{ bottom: '0', float: 'left' }}>Order Id : <span style={{ color: 'orange' }}>{o.order_id}</span></p><br /><br />
                                                <p style={{ float: 'left' }}>Order Date : <span style={{ color: 'blue' }}>{o.order_time.slice(0, 10)}</span></p>
                                            </div>
                                            <div class='justify-end items-end'>
                                                <p class='mt-3 sm:mt-6 sm:ml-12' style={{ float: 'left' }}>Quantity : <span style={{ color: 'darkcyan' }}>{o.product_quantity}</span></p><br /><br />
                                                <p class='mt-3 sm:mt-16 sm:ml-12' style={{ float: 'left' }}>Price : <span>{o.product_price}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <br /><br />
                        </>
                    ))
                }
            </>

    )
}

export default Orders