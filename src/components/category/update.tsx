import React, { useEffect, useState } from 'react'
import img from "../../assets/images/Group48098387.png";

import { Link, useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { useForm } from 'react-hook-form';

import toast, { Toaster } from 'react-hot-toast';
import Loader from '../ul/loader/Loader';
import { creatCategory, GetCategorybyid, UpdatCategory } from '../../shared/api/category';
import { removeCookie } from 'typescript-cookie';
export default function CategoryUpdate() {
    const navgate = useNavigate()

    const { register, handleSubmit, setValue, control, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const [loading, setLoading] = useState(false)
    const param = useParams()
    useEffect(() => {
        const fetchWebSite = async () => {
            const data = await GetCategorybyid(param?.id);
            setValue("name", data?.name)
            setLoading(false)
        }
        fetchWebSite()
            .then((err) => {
                console.log("err");
            })
    }, []);

    const HandleAddWebsite = async (data: any) => {
        await UpdatCategory(data, param?.id)
            .then((response: any) => {
                if (response.status == 200) {
                    setLoading(false)
                    toast("item updated")
                    navgate(routes.CATEGORY)
                } else {
                    toast('please try again')
                }
            })
            .catch(error => {
                if (error?.response?.status == 401) {
                    removeCookie('accesToken')
                    navgate('/login')
                }
                setLoading(false)
                toast(error.message)

            })

    }


    return (
        <>
            {loading ? <Loader /> : ''}
            <form className='ServicesFrom'>
                <div className="ServicesFrom_top">
                    <div className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.CATEGORY}>Добавление услуга</Link></div>
                    <div className='ServicesFrom_top-Edit btnopacity' onClick={() => navgate(routes.CATEGORY)}>Edit</div>
                    <div className='ServicesFrom_top-delete btnopacity' onClick={() => navgate(routes.CATEGORY)}>Delete</div>

                    <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddWebsite)}>Publish</button>
                </div>
                <div className="ServicesFrom_from" >

                    <div className='ServicesFrom_from-mid mid2'>


                        <textarea className='ServicesFrom_from-mid-inputtitle inputtitle2' placeholder='Название услуги' onClick={(e: any) => e.target.classList.add("inputtagcolor")}
                            {...register(`name`, {
                                onChange: e => {
                                    e.target.classList.add("inputtagcolor")
                                    e.target.style.height = "51px";
                                    e.target.style.height = (e.target.scrollHeight) + "px";
                                }
                            })}
                            value={watchedFiles?.name || ''}
                        >
                        </textarea>

                    </div>
                </div>
            </form>
            <Toaster />
        </>
    )
}
