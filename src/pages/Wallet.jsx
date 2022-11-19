import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Dashloader from '../components/Dashloader'
import apihit from '../static/axios'
import staticdata from '../static/staticdata'
import Alert from '../static/Alert'

const Wallet = () => {



    // var Razorpay;

    const [wallet, setwallet] = useState({})
    const [loader, setloader] = useState(true)
    const [money, setmoney] = useState('')
    const [user, setuser] = useState({})
    const [btnloader, setbtnloader] = useState(false)


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

    const Addmoney = () => {
        if (money === '' || money === undefined || money === null) {
            Swal.fire({
                icon: 'warning',
                title: 'Money is Required !!!!',
            })
        }
        else {
            setbtnloader(true)
            console.log(money)
            apihit.post('user/addinwallet', { amount: money })
                .then(res => {
                    console.log(res);
                    // setpaydetails(res.data)
                    startpay(res.data)
                    // document.getElementById('rzp-button1').click()
                })
                .catch(err => {
                    console.log(err);
                    Alert(err.response.status, err.response.data.msg)
                })
        }

    }




    // var rzp1 = new Razorpay(options);
    // document.getElementById('rzp-button1').onclick = function (e) {
    //     rzp1.open();
    //     e.preventDefault();
    // }



    const startpay = (payd) => {

        var options = {
            "key": staticdata.paykey, // Enter the Key ID generated from the Dashboard
            "amount": payd.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Ecom Services",
            "description": "Test Transaction",
            "image": "https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr",
            "order_id": payd.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "handler": function (response) {
                console.log(response);
                apihit.post('user/addwallet', { odid: response.razorpay_order_id, payid: response.razorpay_payment_id, signid: response.razorpay_signature, amount: payd.amount })
                    .then(res => {
                        console.log(res);
                        setmoney('')
                        getwallet()
                        setbtnloader(false)
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

        var rzp1 = new window.Razorpay(options)

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
        getwallet()
        userdetails()
    }, [])


    return (
        loader ? <Dashloader /> :
            <>
                <div className="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">E - Wallet</h5>
                    <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Use E - Wallet to make payment eaiser . </p>
                    <br /><br />
                    <div className="grid grid-cols-2 divide-x divide-green-900">
                        <div>
                            <span className="text-2xl font-semibold" style={{ float: 'left' }}>Balance</span>

                        </div>
                        <div><span className="text-3xl mr-6 font-semibold" style={{ float: 'right', color: wallet.balance < 100 ? 'red' : 'green' }}>{wallet.balance}</span></div>
                    </div>
                    <br /><br />
                    <hr />
                    <br />
                </div>
                <br /><br />
                <div className="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Add Money to your wallet Instantly , Safe and Secure !</p>
                    <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                        <div>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <i className="fa-solid fa-coins"></i>
                                </div>
                                <input type="number" value={money} id="search" onChange={(e) => setmoney(e.target.value)} className=" p-4 pl-10 w-full sm:w-[20rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Money" />
                                <button type="button" disabled={btnloader} onClick={Addmoney} className="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    Add Money {btnloader ? <i className="fas fa-circle-notch fa-spin" style={{ marginLeft: "20px" }} /> : null}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button style={{ visibility: 'hidden' }} onClick={startpay} id="rzp-button1">Pay</button>
            </>
    )
}

export default Wallet