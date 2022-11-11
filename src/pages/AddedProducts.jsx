import React, { useEffect, useState } from 'react'
import apihit from '../static/axios'
import staticdata from '../static/staticdata'

import Dashloader from '../components/Dashloader'
const AddedProducts = () => {


    const [products, setproducts] = useState([])
    const [loader, setloader] = useState(true)

    const getproducts = () => {
        apihit.get('user/getproducts')
            .then(res => {
                console.log(res);
                setproducts(res.data)
                setloader(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getproducts()
    }, [])

    return (
        loader ? <Dashloader /> :

            <div class="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                {/* <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Work fast from anywhere</h5> */}
                {/* <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Stay up to date and move work forward with Flowbite on iOS &amp; Android. Download the app today.</p> */}


                <div className="overflow-y-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    S No.
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Product ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Product Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Product Price
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Product Image
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Generate QR code
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, index) => (

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={p.id}>
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="py-4 px-6">
                                        {p.product_id}
                                    </td>
                                    <td className="py-4 px-6">
                                        {p.product_name}
                                    </td>
                                    <td className="py-4 px-6">
                                        {p.product_price}
                                    </td>
                                    <td className="py-4 px-6">
                                        <img style={{ width: '5cm', height: '5cm' }} src={staticdata.baseurl + 'media/' + p.product_image} alt={p.id} />
                                    </td>
                                    <td className="py-4 px-6">
                                        <button type="button" class="mt-20 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Download Barcode</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    {products.length === 0 ? <p className='text-center font-bold text-2xl mt-10 text-red-600'>No Added Products</p> : null}
                    <br />
                </div>


            </div>

    )
}

export default AddedProducts