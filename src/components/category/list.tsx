import React, { useEffect, useRef, useState } from 'react'

import eye from "../../assets/images/Iconseye.svg"
import img from "../../assets/images/Iconsimg.svg"
import clcik from "../../assets/images/Groupclick.svg"
import routes from '../../shared/constants/routes'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '../ul/loader/Loader'
import { creatCategory, deletCategory, GetCategory } from '../../shared/api/category'

import { removeCookie } from 'typescript-cookie'


export default function CategoryList() {
    const [tr, settr] = useState<string | boolean>("")


    const [data, setData] = useState<any>()
    const x: any = useRef()
    const ul: any = useRef()
    const [isDalete, setIsDalete] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetCategory();
            setData(data.categorie)

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
        deletCategory(id)
            .then((response: any) => {
                setLoading(false)
                if (response?.status === 204) {
                    alert("deleted")
                }
                setIsDalete(true)
            })
            .catch(error => {
                if (error?.response?.status == 401) {
                    removeCookie('accesToken')
                    navigate('/login')
                }
                alert(error.message)
                setLoading(false)
            })

    }


    return (
        <div>
            {loading ? <Loader /> : ''}
            <div className='Filter'>
                <button className='Filter-add' onClick={() => navigate(routes.ADDCATEGORY)}>+ Добавить товар</button>
            </div>

            <ul className="list">
                <li className='list-itemtop'>
                    <input type="checkbox" />
                    <p className='list-itemtop-text'>ID</p>

                    <p className='list-itemtop-textcategory'>Title</p>

                    <p className='list-itemtop-text'>Action</p>
                </li>
                {
                    data && data?.map((e: any) => (
                        <li className='list-item list-itemcategory'>
                            <input type="checkbox" />
                            <p className='list-item-text'>ID: {e?.id}</p>
                            <p className='list-item-textcategory'>{e?.name}</p>

                            <p className='list-item-text'><Link className='list-item-update' to={routes.UPDATECATEGORY + `/${e?._id}`}>Изменить</Link></p>
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
