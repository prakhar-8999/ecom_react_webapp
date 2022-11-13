import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Dashloader from '../components/Dashloader';
import apihit from '../static/axios';
import Alert from '../static/Alert';

const Profile = () => {

    const [prodata, setprodata] = useState({})
    const [loader, setloader] = useState(true)

    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [gst, setgst] = useState('')
    const [updatebtn, setupdatebtn] = useState(false)

    const profile = () => {
        apihit.get('user/details')
            .then(res => {
                console.log(res);
                setprodata(res.data)
                setname(res.data.Name)
                setphone(res.data.Phone)
                setgst(res.data.gst_num)
                setloader(false)
                setupdatebtn(false)
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }

    useEffect(() => {
        profile()
    }, [])


    const updateprofile = () => {
        if (name === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Enter a Valid Name !!!!',
            })
        }
        else if (phone === '' || phone.length !== 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Enter a Valid Phone Number !!!!',
            })
        }
        else if (prodata.who === 'owner') {
            if (gst === '' || gst.length !== 15) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Enter a Valid GST Number !!!!',
                })
            }
            else {
                setupdatebtn(true)
                console.log({ name: name, phone: phone, gst: gst });
                apihit.post('user/completeprofile', { name: name, phone: phone, gst: gst })
                    .then(res => {
                        console.log(res);
                        profile()
                    })
                    .catch(err => {
                        console.log(err);
                        Alert(err.response.status, err.response.data.msg)
                    })
            }
        }
        else if (prodata.who === 'user') {
            setupdatebtn(true)
            console.log({ name: name, phone: phone, gst: gst });
            apihit.post('user/completeprofile', { name: name, phone: phone, gst: gst })
                .then(res => {
                    console.log(res);
                    profile()
                })
                .catch(err => {
                    console.log(err);
                    Alert(err.response.status, err.response.data.msg)
                })
        }
    }


    return (
        loader ? <Dashloader /> :
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto flex flex-col">
                    <div class="lg:w-4/6 mx-auto">
                        <div class="flex flex-col sm:flex-row mt-10">
                            <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div class="flex flex-col items-center text-center justify-center">
                                    <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">{prodata.username}</h2>
                                    <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                    <p class="text-base">{prodata.Name}</p>
                                    <p class="text-base mt-2">{prodata.Phone}</p>
                                    <p class="text-base mt-2">{prodata.Email}</p>
                                    <p class="text-base mt-2">{prodata.gst_num}</p>
                                </div>
                            </div>
                            <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <h3 class="leading-relaxed text-2xl mb-4">Complete Your Profile to explore more</h3><br />
                                <input type="text" value={name} onChange={(e) => setname(e.target.value)} class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="Your Name" /> <br />
                                <input type="number" value={phone} onChange={(e) => setphone(e.target.value)} class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="Phone" /> <br />
                                <input type="text" value={gst} onChange={(e) => setgst(e.target.value)} style={{ display: prodata.who === 'owner' ? 'block' : 'none' }} class="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="GST Number" /> <br />
                                <button onClick={updateprofile} disabled={updatebtn} class="py-3 px-5 block w-full rounded-full bg-green-300 hover:bg-green-400">
                                    Update {updatebtn ? <i className="fas fa-circle-notch fa-spin" style={{ marginLeft: "20px" }} /> : null}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Profile