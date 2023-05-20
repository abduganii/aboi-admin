import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import routes from '../../shared/constants/routes'


import Navbar from '../navbar/navbar'



export default function Bodyadmin() {
    return (
        <div className='Bodyadmin'>
            <div className="container">
                <Navbar />
                <div className='Bodyadmin-left'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
