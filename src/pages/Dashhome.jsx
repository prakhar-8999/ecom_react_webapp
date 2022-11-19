import React, { useEffect, useState } from 'react'
import apihit from '../static/axios'

const Dashhome = () => {

    const [count, setCount] = useState({})

    const getCount = () => {
        apihit.get('user/basicCount')
            .then(res => {
                console.log(res);
                setCount(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getCount()
    }, [])

    return (
        <>
            <div className="cards">
                <div className="card-single">
                    <div>
                        <h1>{count.l}</h1>
                        <span>Logged in Device</span>
                    </div>
                    <div>
                        <span className="fas fa-users"></span>
                    </div>
                </div>
                <div className="card-single">
                    <div>
                        <h1>{count.c}</h1>
                        <span>Cart</span>
                    </div>
                    <div>
                        <span className="fas fa-clipboard-list"></span>
                    </div>
                </div>
                <div className="card-single">
                    <div>
                        <h1>{count.o}</h1>
                        <span>Orders</span>
                    </div>
                    <div>
                        <span className="fas fa-shopping-cart"></span>
                    </div>
                </div>
                <div className="card-single">
                    <div>
                        <h1>{count.w}</h1>
                        <span>E-Wallet</span>
                    </div>
                    <div>
                        <span className="fas fa-wallet"></span>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Dashhome