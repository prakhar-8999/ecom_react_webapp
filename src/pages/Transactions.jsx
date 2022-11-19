import React, { useState, useEffect } from 'react'
import apihit from '../static/axios'
import Dashloader from '../components/Dashloader'
import Alert from '../static/Alert'
const Transactions = () => {


    const [trans, settrans] = useState([])
    const [loader, setloader] = useState(true)

    const getTransaction = () => {
        apihit.get('user/getTransaction')
            .then(res => {
                console.log(res)
                settrans(res.data)
                setloader(false)
            })
            .catch(err => {
                console.log(err)
                Alert(err.response.status, err.response.data.msg)
            })
    }

    useEffect(() => {
        getTransaction()
    }, [])


    return (
        loader ?
            <Dashloader /> :

            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                S No.
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Order Id
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Payment Id
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Transaction Type
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Transaction Amount
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Transaction Signature
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            trans.map((t, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="py-4 px-6">
                                        {t.orderid}
                                    </td>
                                    <td className="py-4 px-6">
                                        {t.paymentid}
                                    </td>
                                    <td className="py-4 px-6">
                                        {t.transactiontype === 'wallet' ? 'Wallet TOP UP' : 'Purchase'}
                                    </td>
                                    <td className="py-4 px-6">
                                        {t.amount}
                                    </td>
                                    <td className="py-4 px-6">
                                        {t.signatureid}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {trans.length === 0 ? <p className='text-center font-bold text-2xl mt-10 text-red-600'>No Transaction Found</p> : null}
            </div>

    )
}

export default Transactions