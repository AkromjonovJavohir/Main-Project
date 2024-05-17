import React from 'react'
import logo from '../../assets/img/logo.png'
import { NavLink ,Link} from 'react-router-dom'
export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-logo'>
                <Link className="active" to={"/home"}>    <img src={logo} alt="" /></Link>
            </div>
            <ul className='sidebar-menu'>
                <li>
                    <NavLink to={"/home"}>
                        <span className='sidebar-menu-icon'>
                        <i className="bi bi-house-door-fill"></i>
                        </span>
                        <span className='sidebar-menu-text'>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/course"}>
                        <span className='sidebar-menu-icon'>
                        <i className="bi bi-layers-half"></i>                        </span>
                        <span className='sidebar-menu-text'>Course</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/reception"}>
                        <span className='sidebar-menu-icon'>
                        <i className="bi bi-info-circle-fill"></i>
                        </span>
                        <span className='sidebar-menu-text'>Reception</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/teacher"}>
                        <span className='sidebar-menu-icon'>
                        <i className="bi bi-people-fill"></i>                        </span>
                        <span className='sidebar-menu-text'>Teacher</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/group"}>
                        <span className='sidebar-menu-icon'>
                       < i className="bi bi-collection-fill"></i>
                        </span>
                        <span className='sidebar-menu-text'>Group</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/news"}>
                        <span className='sidebar-menu-icon'>
                        <i className="bi bi-volume-up-fill"></i>                        </span>
                        <span className='sidebar-menu-text'>Message</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
