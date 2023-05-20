import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import routes from '../../shared/constants/routes'
import GlobalContext from '../../shared/contexts/GlobalContext'

export default function Navbar() {
    const { page, setPage } = useContext(GlobalContext)


    return (
        <div className='navbar'>
            <ul className='navbar-list' >
                <li className='navbar-item' onClick={() => setPage(`Главная`)}>  <NavLink activeClassName className='navbar-link' to={routes.HOME}  >Главная   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Продукты')}>  <NavLink activeClassName className='navbar-link' to={routes.PRODUCTS} >Продукты   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Каталог')}>  <NavLink activeClassName className='navbar-link' to={routes.CATEGORY}>Категории   </NavLink> </li>
                <li className='navbar-item' onClick={() => setPage('Контакты')}>  <NavLink activeClassName className='navbar-link' to={'/'} >Контакты  </NavLink> </li>

            </ul>
            <p className='navbar-settings'> <NavLink className='navbar-link' to={routes.SETTINGS}>Настройки</NavLink></p>
        </div>
    )
}
