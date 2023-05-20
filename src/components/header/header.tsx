import React, { useContext } from 'react'

import logo from "../../assets/images/Админка.svg"
import logo1 from "../../assets/images/Ellipse.svg"
import icon from "../../assets/images/Groupre.svg"
import GlobalContext from '../../shared/contexts/GlobalContext'

export default function Header() {
    const { page, setPage } = useContext<any>(GlobalContext)
    return (
        <header className='header'>
            <div className="container">
                <div className='header_left'>
                    <img src={logo} alt="logo" />
                    <div className='header_user'>
                        <img src={logo1} alt="img" />
                        <div className='header_user-wrap'>
                            <div>
                                <p className='header_user-name'>Ism Familia</p>
                                <p className='header_user-who'>Kimligi</p>
                            </div>
                        </div>
                    </div>
                    <h3 className='header-title'>{page}</h3>
                </div>
                <div className='header_right'>
                    <div className="header_icon">
                        <div className='header_icon-line'></div>
                        <img className='header_icon-imd' src={icon} alt="img" />
                    </div>
                    <div className='header-img'></div>

                    <input className='header-input' type="text" placeholder='text' />
                </div>
            </div>
        </header>
    )
}
