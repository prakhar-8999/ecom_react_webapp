import React, { useState } from 'react'
import Swal from 'sweetalert2'

const Addproducts = () => {

    const [addbtn, setaddbtn] = useState(false)

    const [pdname, setpdname] = useState('')
    const [pdprice, setpdprice] = useState('')

    const [imdisplay, setimdisplay] = useState(false)

    const AddProduct = () => {
        if (pdname === '' || pdname === undefined || pdname === null) {
            Swal.fire({
                icon: 'warning',
                title: "Product Name Can't be Empty !!!!"
            })
        }
        else if (pdprice === '' || pdprice === undefined || pdprice === null) {
            Swal.fire({
                icon: 'warning',
                title: "Product Price Can't be Empty !!!!"
            })
        }
        else if (document.getElementById('product-file').files[0] === undefined || document.getElementById('product-file').files[0] === null) {
            Swal.fire({
                icon: 'warning',
                title: "Please select a product file !!!!"
            })
        }
        else {
            console.log({ productname: pdname, productprice: pdprice })
            console.log(document.getElementById('product-file').files[0]);
        }
    }


    const showproduct = () => {
        console.log('file changed')
        var fileUpload = document.getElementById("product-file");
        if (typeof (fileUpload.files) != "undefined") {
            setimdisplay(true)
            document.getElementById('product-show').src = URL.createObjectURL(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    }


    return (

        <div class="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Add Products</h5>
            <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Stay up to date with Inno-cart and increase your bussisness to another extent.</p>
            <br />
            {/* <p style={{ float: 'left' }}>Enter Details of Poduct</p> */}

            <p class="text-2xl">Enter Product Details</p>
            <br /><br />
            {/* <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"> */}
            <input type="text" onChange={e => setpdname(e.target.value)} class="py-3 px-5 bg-gray-100 block w-full border-gray-500 rounded-full text-sm focus:border-gray-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="Product Name" /><br />
            <input type="number" onChange={e => setpdprice(e.target.value)} class="py-3 px-5 bg-gray-100 block w-full border-gray-500 rounded-full text-sm focus:border-gray-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="Product Price" /><br />
            {/* <input type="text" class="py-3 px-5 bg-gray-200 block w-full border-gray-500 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="Product Name" /> */}
            {/* </div> */}

            <div class="flex justify-center items-center w-full">
                <label for="product-file" class="flex flex-col justify-center items-center w-full h-64 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="relative flex flex-col justify-center items-center pt-5 pb-6 overflow-hidden">
                        <img class="object-cover w-full h-64" src="" alt="" id="product-show" />
                        <div class="absolute w-full" style={{ display: imdisplay ? 'block' : 'none' }}>
                            <center><svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></center>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <div style={{ display: imdisplay ? 'none' : 'block' }}>
                            <center><svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></center>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                    </div>
                    <input id="product-file" onChange={showproduct} type="file" class="hidden" />
                </label>
            </div>
            <br /><br />
            <button type="button" onClick={AddProduct} disabled={addbtn} style={{ width: '100%' }} class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Add Product {addbtn ? <i className="fas fa-circle-notch fa-spin" style={{ marginLeft: "20px" }} /> : null}
            </button>

        </div>

    )
}

export default Addproducts