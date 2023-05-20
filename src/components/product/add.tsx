import React, { useEffect, useState } from 'react'
import img from "../../assets/images/Group48098387.png";

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { useForm } from 'react-hook-form';


import toast, { Toaster } from 'react-hot-toast';
import Loader from '../ul/loader/Loader';
import SelectInput from '../ul/inputSelct';
import { GetCategory } from '../../shared/api/category';
import { DeleteImg, UploadImg } from '../../shared/api/multer';
import { creatPRODUCTS } from '../../shared/api/product';
import { removeCookie } from 'typescript-cookie';
export default function PruductAdd() {
    const navgate = useNavigate()
    const [params, setSearchParams] = useSearchParams()
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const [img1, setImg1] = useState<any>([])
    const [category, SetCategory] = useState([])
    const [categoryId, SetCategoryID] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCAtegory = async () => {
            const data = await GetCategory();
            SetCategory(data.categorie)

        }
        fetchCAtegory()
            .then((err) => {
                console.log("err");
            })

    }, []);

    const HandleAddWebsite = async (data: any) => {


        await creatPRODUCTS({ img: img1, categorie: categoryId, ...data })
            .then((response) => {
                if (response.status == 200) {
                    setLoading(false)
                    toast("item updated")
                    navgate(routes.PRODUCTS)
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
    const hendleimg = async (e: any) => {
        if (e.target.files[0]) {
            const formData = new FormData()
            formData.append("image", e.target.files[0])
            await UploadImg(formData)
                .then((response) => {
                    setImg1((status: any) => [...status, response?.data?.url])
                })
                .catch(error => {
                    setLoading(false)
                    toast(error.message)

                })
        }

    }



    return (
        <>
            {loading ? <Loader /> : ''}
            <form className='ServicesFrom'>
                <div className="ServicesFrom_top">
                    <div className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.PRODUCTS}>Добавление</Link></div>
                    <div className='ServicesFrom_top-Edit btnopacity' onClick={() => navgate(routes.PRODUCTS)}>Edit</div>
                    <div className='ServicesFrom_top-delete btnopacity' onClick={() => navgate(routes.PRODUCTS)}>Delete</div>

                    <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddWebsite)}>Publish</button>
                </div>
                <div className="ServicesFrom_from" >

                    <div className='ServicesFrom_from-mid mid2'>
                        <div className='mid2-div'>
                            <label className='ServicesFrom_from-img img2' >
                                <input className='img2-img' type={"file"} onChange={hendleimg} />
                                <img className='ServicesFrom_from-imgvie2' src={img} alt="" width={105} height={81} />
                            </label>
                            {img1 && img1.map((e: any, i: any) => (
                                <div className='ServicesFrom_from-imgviedivcha'>
                                    <img key={i} className='ServicesFrom_from-imgvie' src={e || img} alt="" width={105} height={81} />
                                    <div onClick={() => {
                                        DeleteImg({ url: e })
                                        setImg1((state: any) => state.filter((_: any, index: any) => index !== i))

                                    }}> X</div>
                                </div>
                            ))}
                        </div>
                        <div className='ServicesFrom_from-mid-left'>

                            <textarea className='ServicesFrom_from-mid-inputtitle inputtitle2' placeholder='Название услуги' onClick={(e: any) => e.target.classList.add("inputtagcolor")}
                                {...register('name', {
                                    onChange: e => {
                                        e.target.classList.add("inputtagcolor")
                                        e.target.style.height = "51px";
                                        e.target.style.height = (e.target.scrollHeight) + "px";
                                    }
                                })}
                            >

                            </textarea>
                            <div className='ServicesFrom_from-mid-tags'>

                                {category ? <SelectInput id={''} categories={category} onChange={(id: any) => SetCategoryID(id)} /> : ""}

                            </div>
                            <input className='ServicesFrom_from-mid-date' type="text" placeholder='price'
                                {...register('price', { required: true })} />
                        </div>
                    </div>
                    <textarea className='ServicesFrom_from-mid-inputtext' placeholder='описания'
                        {...register('description', {
                            onChange: e => {
                                e.target.style.height = "37px";
                                e.target.style.height = (e.target.scrollHeight) + "px";
                            }
                        })}
                    >
                    </textarea>
                </div>
            </form>
            <Toaster />
        </>
    )
}
