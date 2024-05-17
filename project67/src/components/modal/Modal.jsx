import React from 'react'
import './modal.css'
export default function Modal(props) {
    return (



        <div className='modal' onClick={closeModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()} >
                <h1 className='modal-header'>
                    <i className="bi bi-x-lg" onClick={closeModal}></i>
                </h1>
                <div className='modal-body'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export const openModal = () => {
    document.querySelector(".modal").classList.add("modal-active")
}
export const closeModal = () => {
    document.querySelector(".modal").classList.remove("modal-active")
    document.querySelector(".modal form").reset()
}