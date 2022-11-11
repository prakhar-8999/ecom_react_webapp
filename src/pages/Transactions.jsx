import React, { useState, useEffect } from 'react'
import apihit from '../static/axios'

const Transactions = () => {


    const [trans, settrans] = useState([])

    const getTransaction = () => {
        apihit.get('user/getTransaction')
            .then(res => {
                console.log(res)
                settrans(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTransaction()
    }, [])


    return (

        <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            S No.
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Order Id
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Payment Id
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Transaction Type
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Transaction Amount
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Transaction Signature
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trans.map((t, index) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index}
                                </th>
                                <td class="py-4 px-6">
                                    {t.orderid}
                                </td>
                                <td class="py-4 px-6">
                                    {t.paymentid}
                                </td>
                                <td class="py-4 px-6">
                                    {t.transactiontype === 'wallet' ? 'Wallet TOP UP' : 'Purchase'}
                                </td>
                                <td class="py-4 px-6">
                                    {t.amount}
                                </td>
                                <td class="py-4 px-6">
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