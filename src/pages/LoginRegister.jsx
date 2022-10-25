import React, { useState } from 'react'
import apihit from '../static/axios';
import Footer from '../components/Footer';
import '../styles/loginregister.css'
import Alert from '../static/Alert';

const LoginRegister = () => {

    const [reuser, setreuser] = useState('')
    const [repass, setrepass] = useState('')
    const [reemail, setreemail] = useState('')

    const [louser, setlouser] = useState('')
    const [lopass, setlopass] = useState('')
    const [otp, setotp] = useState('')
    // const sign_in_btn = document.getElementById("sign-in-btn");
    // const sign_up_btn = document.getElementById("sign-up-btn");
    // const container = document.getElementById("container");

    // sign_up_btn.addEventListener("click", () => {
    //     container.classList.add("sign-up-mode");
    // });

    // sign_in_btn.addEventListener("click", () => {
    //     container.classList.remove("sign-up-mode");
    // });

    // const container = document.getElementById("main_div");

    const makesignup = () => {
        const container = document.getElementById("main_div");
        container.classList.add("sign-up-mode");
    }

    const makesignin = () => {
        const container = document.getElementById("main_div");
        container.classList.remove("sign-up-mode");
    }

    const signup = (event) => {
        event.preventDefault()
        console.log({ username: reuser, email: reemail, password: repass });
        apihit.post('user/otp', { username: reuser, email: reemail, password: repass })
            .then(res => {
                document.getElementById('open-modal').click()
                console.log(res.status, res.data.msg);
            })
            .catch(err => {
                console.log(err);
                Alert(err.response.status, err.response.data.msg)
            })
    }

    const otpverify = (event) => {
        event.preventDefault()
        console.log({ username: reuser, email: reemail, password: repass, otp: otp });
        apihit.post('user/register', { username: reuser, email: reemail, password: repass, otp: otp })
            .then(res => {
                console.log(res);
                document.getElementById('modal-close').click()
                Alert(res.status, res.data.msg)
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.status);
                Alert(err.response.status, err.response.data.msg)
            })
    }

    return (
        <>
            {/* <body> */}
            <div class="container123" id="main_div">
                <div class="forms-container">
                    <div class="signin-signup">
                        <form action="#" class="sign-in-form">
                            <h2 class="title">Sign in</h2>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" placeholder="Username" />
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="password" placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" class="btn solid" />
                            <p class="social-text">Or Sign in with social platforms</p>
                            <div class="social-media">
                                <a href="#" class="social-icon">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-google"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>
                        <form class="sign-up-form" onSubmit={signup}>
                            <h2 class="title">Sign up</h2>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" placeholder="Username" onChange={(e) => setreuser(e.target.value)} />
                            </div>
                            <div class="input-field">
                                <i class="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" onChange={(e) => setreemail(e.target.value)} />
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="password" placeholder="Password" onChange={(e) => setrepass(e.target.value)} />
                            </div>
                            <input type="submit" class="btn" value="Sign up" />
                            <p class="social-text">Or Sign up with social platforms</p>
                            <div class="social-media">
                                <a href="#" class="social-icon">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-google"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="panels-container">
                    <div class="panel left-panel">
                        <div class="content">
                            <h3>New here ?</h3>
                            <p>
                                Welcome to the world of INNO-CART, A single E-Commerce Platform (One For All)
                            </p>
                            <button class="btn transparent" id="sign-up-btn" onClick={makesignup}>
                                Sign up
                            </button>
                        </div>
                        <img src="img/log.svg" class="image" alt="" />
                    </div>
                    <div class="panel right-panel">
                        <div class="content">
                            <h3>One of us ?</h3>
                            <p>
                                Welcome to the world of INNO-CART, A single E-Commerce Platform (One For All)
                            </p>
                            <button class="btn transparent" id="sign-in-btn" onClick={makesignin}>
                                Sign in
                            </button>
                        </div>
                        <img src="img/register.svg" class="image" alt="" />
                    </div>
                </div>
            </div>
            {/* </body> */}
            <div class="mob-view">
                <Footer />
            </div>



            <button style={{ visibility: 'hidden' }} id='open-modal' data-hs-overlay="#hs-vertically-centered-modal">open modal</button>

            <div id="hs-vertically-centered-modal" class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 class="font-bold text-gray-800 dark:text-white">
                                OTP Verification
                            </h3>
                            <button id="modal-close" type="button" class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                                <span class="sr-only">Close</span>
                                <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                        <div class="p-4 overflow-y-auto">
                            <div class="py-5 px-3">
                                <div class="container mx-auto">
                                    <div class="max-w-sm mx-auto md:max-w-lg">
                                        <div class="w-full">
                                            <div class="bg-white h-64 py-3 rounded text-center">
                                                <h1 class="text-2xl font-bold">OTP Verification</h1>
                                                <div class="flex flex-col mt-4">
                                                    <span>Enter the OTP you received at</span><br />
                                                    <span class="font-bold">{reemail}</span>
                                                    <span>Please Check your Spam</span>
                                                </div>
                                                <br />
                                                <div>
                                                    <label class="block mb-1 font-bold text-gray-500">OTP</label>
                                                    <input type="number" name="otp" onChange={(e) => setotp(e.target.value)} style={{ width: '8cm' }} class="border-2 border-gray-200 p-3 rounded outline-none focus:border-yellow-500" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                            <button type="button" class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                                Cancel
                            </button>
                            <button type="button" onClick={otpverify} class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default LoginRegister