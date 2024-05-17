import React from 'react'
import { PulseLoader } from 'react-spinners';


export default function Spinner() {
    return (
        
        <div className='spinner-container'>
            <PulseLoader color="rgb(63 140 255)" size="30px" />
        </div>
    )
}
