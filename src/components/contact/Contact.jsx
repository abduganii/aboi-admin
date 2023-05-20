import React, { useState } from 'react'
import { YMaps, Map } from "react-yandex-maps";

import { Link, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';

const data = {
    name: "BSS",
    gmail: "info@gmail.com",
    number: "+998 78 100-00-00"
}

export default function Contact() {
    const params = useParams()
    const [name, setName] = useState(data?.name)
    const [gmail, setGmail] = useState(data?.gmail)
    const [number, setNumber] = useState(data?.number)

    return (
        <div className='ServicesFrom'>
            <div className="ServicesFrom_top">
                <button className='ServicesFrom_top-Edit btnopacity'>Изменить</button>
                <button className='ServicesFrom_top-delete btnopacity'>Удалить</button>
                <button className='ServicesFrom_top-Cancel '>Отменить</button>
                <button className='ServicesFrom_top-Publish'>Сохранить</button>
            </div>
            <form className="ServicesFrom_from">
                <div className='ServicesFrom_from-mid mid2'>
                    <div className='mid2-div'>
                        <YMaps>
                            <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width={340} height={340} />
                        </YMaps>
                    </div>
                    <div className='ServicesFrom_from-mid-left'>
                        <input className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Имя фамилия' value={name} onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={(e) => {
                            e.target.classList.add("inputtagcolor")
                            setName(e.target.value)
                        }} />
                        <div className='ServicesFrom_from-mid-tags' >
                            <input className='ServicesFrom_from-mid-inputtag' type="text" placeholder='Телефон' value={number} onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                e.target.classList.add("inputtagcolor")
                                setNumber(e.target.value)
                            }} />

                        </div>
                        <div className='ServicesFrom_from-mid-tags'>
                            <input className='ServicesFrom_from-mid-inputtag' type={"email"} placeholder='E-mail' value={gmail} onClick={(e) => e.target.classList.add("inputtagcolor")} onChange={e => {
                                e.target.classList.add("inputtagcolor")
                                setGmail(e.target.value)
                            }} />

                        </div>
                    </div>
                </div>
                <p className='ServicesFrom_from-add'> Как добавить новости?</p>
            </form>
        </div>
    )
}
