// import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import apihit from '../static/axios'
import '../styles/dashboard.css'
import deimg from '../images/default.png'
import Dashloader from '../components/Dashloader'
import { message } from 'antd'

const Dashboard = () => {

    const navigate = useNavigate()

    const [usdata, setusdata] = useState({})
    const [leftside, setleftside] = useState([])

    const [loader, setloader] = useState(true)

    const dashhit = () => {
        apihit.get('user/details')
            .then(res => {
                console.log(res);
                setusdata(res.data)
                setloader(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const leftpannel = () => {
        apihit.get('user/leftpannel')
            .then(res => {
                console.log(res);
                setleftside(res.data)
                setloader(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

    // setTimeout(() => dashhit(), 6000);
    useEffect(() => {
        dashhit()
        leftpannel()
    }, [])

    const logout = () => {
        apihit.get('user/logout')
            .then(res => {
                console.log(res);
                message.success({
                    content: 'Logout Successfull !!!!',
                    className: 'custom-class',
                    style: {
                        marginTop: '3cm',
                    },
                });
                // message.success("Logout Successfull !!!!")
                localStorage.removeItem('access')
                navigate("/LoginRegister")
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        loader ? <Dashloader /> :
            <>
                <div>
                    <input type="checkbox" id="nav-toggle" />
                    <div class="sidebar">
                        <div class="sidebar-brand">
                            <h1> <span class="fab fa-asymmetrik"> </span> <span>Aizcar</span>
                            </h1>
                        </div>

                        <div class="sidebar-menu">
                            <ul>
                                {
                                    leftside.map((l) => (
                                        <li>
                                            <Link to={l.url} key={l.id}>
                                                <span class={l.icons}></span>
                                                <span>{l.field}</span>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div class="main-content">
                        <header>
                            <h2>
                                <label for="nav-toggle">
                                    <span class="fas fa-bars"></span>
                                </label>
                                Dashboard
                            </h2>

                            <div class="search-wrapper">
                                <span class="fas fa-search"> </span>
                                <input type="search" placeholder="Search..." />

                            </div>
                            <div class="hs-dropdown relative inline-flex">
                                <button id="hs-dropdown-custom-icon-trigger" class="user-wrapper">
                                    <img src={deimg} width="40px" height="40px" alt="profile-img" />
                                    <div class="">
                                        <h4>{usdata.username}</h4>
                                        {/* <small>Super Admin</small> */}
                                    </div>
                                </button>
                                <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-custom-icon-trigger">
                                    <button onClick={logout} style={{ width: '100%' }} class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                        <i class="fa-solid fa-right-from-bracket"></i> Logout
                                    </button>
                                    {/* <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                    Purchases
                                </a>
                                <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                    Downloads
                                </a>
                                <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                    Team Account
                                </a> */}
                                </div>
                            </div>
                        </header>

                        <main>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </>
    )
}

export default Dashboard
