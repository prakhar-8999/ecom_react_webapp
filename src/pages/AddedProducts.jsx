import React, { useEffect, useState } from 'react'
import apihit from '../static/axios'
import staticdata from '../static/staticdata'
import Alert from '../static/Alert'
import Dashloader from '../components/Dashloader'
// import QRCode from "react-qr-code"

const AddedProducts = () => {


    const [products, setproducts] = useState([])
    const [loader, setloader] = useState(true)
    const [search, setsearch] = useState('')

    const getproducts = () => {
        apihit.get('user/getproducts')
            .then(res => {
                console.log(res);
                setproducts(res.data)
                setloader(false)
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }

    const genQr = (data) => {
        console.log(data);
        console.log('asdannsdma,snm,');
        apihit.post('user/genqrcode', data)
            .then(res => {
                console.log(res);
                console.log(staticdata.baseurl + res.data.qr_image);
                window.open(staticdata.baseurl + res.data.qr_image, '_blank')
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
            <>

                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input onChange={e => setsearch(e.target.value)} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your orders" required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
                <br />
                <div className="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    {/* <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Work fast from anywhere</h5> */}
                    {/* <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Stay up to date and move work forward with Flowbite on iOS &amp; Android. Download the app today.</p> */}


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
                                {products.filter(any => any.product_name.includes(search)).map((p, index) => (

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
                                            <button onClick={() => genQr(p)} type="button" className="mt-20 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Get Qrcode</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {products.length === 0 ? <p className='text-center font-bold text-2xl mt-10 text-red-600'>No Added Products</p> : null}
                        <br />
                    </div>


                </div>
            </>


    )
}

export default AddedProducts