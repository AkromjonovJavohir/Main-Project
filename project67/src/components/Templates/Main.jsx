import React, { useEffect } from 'react'
import message from '../../../src/assets/audio/message.wav'
import { useContext } from 'react';
import { NotificationContext } from '../../context/count';
export default function Main(props) {
    const [notificationCount] = useContext(NotificationContext)
    const audio = new Audio(message);
    useEffect(() => {
        if (notificationCount > 0 && audio) {
            try {
                audio.play()
            } catch (error) {
                console.log(error);
            }

        }
    }, [notificationCount])

    useEffect(() => {
        const body = document.querySelector("body")
        let t = localStorage.getItem("theme")
        if (t) {
            body.classList.add("dark-theme")
        }
    }, [])

    const changeTheme = () => {
        const body = document.querySelector("body")
        let t = localStorage.getItem("theme")
        if (t) {
            localStorage.removeItem("theme")
            body.classList.remove("dark-theme")
            return;
        }
        body.classList.add("dark-theme")
        localStorage.setItem('theme', "dark")

    }


    return (
        <div className='main'>
         
            <a href="/media/cc0-audio/t-rex-roar.mp3"> Download audio </a>
            <div className='navbar'>
                <div className='navbar-left'>
                    <div>
                        <p>Pages</p>
                        <div>/</div>
                        <span>Dashboard</span>
                    </div>
                    <div>Dashboard</div>
                </div>
                <div className='navbar-right'>
                    <div className='navbar-input'>
                        <span><i className="bi bi-search"></i></span>
                        <input type="text" placeholder='Type here...' />
                    </div>
                    <div className='navbar-sign'>
                        <div className='navbar-sign-icon'><span><i className="bi bi-person-fill"></i></span></div>
                        <div>Sign In</div>
                    </div>
                    <div className='navbar-settings'>
                        <span><i className="bi bi-gear-fill" onClick={changeTheme}></i></span>
                        <span className='notifications'>
                            <i className="bi bi-bell-fill"></i>
                            <div className='news-count'>{notificationCount}</div>
                        </span>
                    </div>
                </div>
            </div>
            <div className='content'>
                {
                    props.children
                }
            </div>
        </div>
    )
}
