import React, { useEffect, useRef, useState } from 'react'

import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Iconsimg.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '../ul/loader/Loader'
import { deletPRODUCTS, GetPRODUCTS } from '../../shared/api/product'




export default function ProductsList() {
    const [tr, settr] = useState<string | boolean>("")


    const [data, setData] = useState<any>()
    const x: any = useRef()
    const ul: any = useRef()
    const [isDalete, setIsDalete] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetPRODUCTS();
            setData(data?.Products)

            setLoading(false)
        }
        fetchWebSite()
            .then((err) => {
                console.log("err");
            })

    }, [isDalete]);


    const handleDelete = (id: any) => {
        setLoading(true)
        setIsDalete(false)
        deletPRODUCTS(id)
            .then((response: any) => {
                setLoading(false)
                if (response?.status === 204) {
                    alert("deleted")
                }
                setIsDalete(true)
            })
            .catch(error => {
                alert(error.message)
                setLoading(false)
            })

    }


    return (
        <div>
            {loading ? <Loader /> : ''}
            <div className='Filter'>
                <button className='Filter-add' onClick={() => navigate(routes.ADDPRODUCTS)}>+ Добавить товар</button>
            </div>

            <ul className="list">
                <li className='list-itemtop'>
                    <input type="checkbox" />
                    <p className='list-itemtop-text2'>ID</p>
                    <p className='list-itemtop-text2'>Picture</p>
                    <p className='list-itemtop-text2'>Название</p>
                    <p className='list-itemtop-text2'>Категория</p>
                    <p className='list-itemtop-text2'>Описание</p>
                    <p className='list-itemtop-text2'>Цена</p>
                    <img className='list-itemtop-text2' src={eye} alt="" />
                    <p className='list-itemtop-text2'>Действия</p>
                </li>
                {
                    data && data?.map((e: any) => (
                        <li className='list-item'>
                            <input type="checkbox" />
                            <p className='list-item-text2'>ID: {e?.id}</p>
                            <div className='list-item-text2  list-item-div2'><img src={e?.img[0]} alt="" />{e?.img[1] ? <img src={e?.img[1]} alt="" /> : ""}  {e?.img[2] ? <img src={e?.img[2]} alt="" /> : ''}</div>

                            <p className='list-item-text2'>{e?.name}</p>
                            <p className='list-item-text2'>{e?.name}</p>
                            <p className='list-item-text2'>{e?.description.slice(0, 50)}...</p>
                            <p className='list-item-text2'>{e?.price.slice(0, 10)}</p>
                            <p className='list-item-text2'>{e?.view}</p>
                            <p className='list-item-text2'><Link className='list-item-update' to={routes.UPDATEPRODUCTS + `/${e?._id}`}>Изменить</Link></p>
                            <img ref={ul} style={{ padding: " 0 5px", cursor: 'pointer' }} src={clcik} alt="" width={13} onClick={() => {
                                settr(state => state === e?._id ? false : e?._id)


                            }} />
                            <ul className='list-item-drop' style={tr == e?._id ? { display: "inline-block", zIndex: 10 } : { display: "none", zIndex: 0 }}>
                                <li className='list-item-drop-text'>Копировать</li>
                                <li className='list-item-drop-text' onClick={() => handleDelete(e?._id)}>Удалить</li>
                            </ul>
                        </li>
                    ))
                }
            </ul>


        </div>
    )
}
