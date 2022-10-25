import React from 'react'
import Swal from 'sweetalert2';

const Alert = (alert, messg) => {
    console.log(alert)
    console.log('fsdfsdfdfdsfsdfdsfs');
    const givealert = () => {
        if (alert === 406) {
            Swal.fire({
                icon: 'error',
                title: messg,
            })
        }
        else if (alert === 200) {
            Swal.fire({
                icon: 'success',
                title: messg,
                showConfirmButton: false,
                timer: 1000
            })
        }
    }

    givealert();

    return (
        <div>Alert</div>
    )
}

export default Alert