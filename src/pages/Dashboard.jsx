import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import apihit from '../static/axios'
import '../styles/dashboard.css'
import deimg from '../images/default.png'
import Dashloader from '../components/Dashloader'
const Dashboard = () => {

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



    return (
        loader ? <Dashloader /> :
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

                        <div class="user-wrapper">
                            <img src={deimg} width="40px" height="40px" alt="profile-img" />
                            <div class="">
                                <h4>{usdata.username}</h4>
                                {/* <small>Super Admin</small> */}
                            </div>
                        </div>
                    </header>

                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
    )
}

export default Dashboard
