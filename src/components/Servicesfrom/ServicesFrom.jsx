// import React, { useEffect, useState } from 'react'
// import img from "../../assets/images/Group48098387.png";

// import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import routes from '../../shared/constants/routes';
// import { GetServicebyid, UpdateService } from '../../shared/api/service';
// import Loader from '../ul/loader/Loader';
// import { DeleteImg, UploadImg } from '../../shared/api/multer';
// import { useForm } from 'react-hook-form';
// import toast, { Toaster } from 'react-hot-toast';

// export default function ServicesFrom() {
//     const navgate = useNavigate()

//     const [data1, setData] = useState(null)
//     const { register, handleSubmit, control, setValue, formState: { errors }, watch } = useForm();
//     const watchedFiles = watch()
//     const [params, setSearchParams] = useSearchParams()
//     const param = useParams()
//     const [img1, setImg1] = useState(data1?.img)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         const fetchWebSite = async () => {
//             const data = await GetServicebyid(param?.id);
//             setValue("uz_title", data?.uz_title)
//             setValue("ru_title", data?.ru_title)
//             setValue("tr_title", data?.tr_title)
//             setValue("en_title", data?.en_title)
//             setValue("uz_text", data?.uz_text)
//             setValue("ru_text", data?.ru_text)
//             setValue("tr_text", data?.tr_text)
//             setValue("en_text", data?.en_text)
//             setImg1(data?.img)
//             setData(data)
//             setLoading(false)
//         }
//         fetchWebSite()
//             .then((err) => {
//                 console.log("err");
//             })
//     }, []);

//     const HandleAddWebsite = async (data) => {
//         setLoading(true)
//         if (data) {
//             await UpdateService({ img: img1, ...data }, param?.id)
//                 .then((response) => {
//                     if (response.status == 200) {
//                         setLoading(false)
//                         toast("item updated")
//                         navgate(routes.SERVICES)
//                     } else {
//                         toast('please try again')
//                     }
//                 })
//                 .catch(error => {
//                     setLoading(false)
//                     toast(error.message)
//                 })
//         } else {
//             toast('inputs are requred to fill')
//             setLoading(false)
//         }
//     }
//     const hendleimg = async (e) => {
//         if (e.target.files[0]) {
//             const formData = new FormData()
//             formData.append("image", e.target.files[0])
//             await UploadImg(formData)
//                 .then((response) => {
//                     setImg1(status => [...status, response?.data])
//                 })
//                 .catch(error => {
//                     setLoading(false)
//                     toast(error.message)
//                 })
//         }
//     }

//     useEffect(() => {
//         if (!['uz', 'ru', 'tr', 'en']?.includes(params.get('lang'))) {
//             setSearchParams({ lang: 'uz' })
//         }
//     }, [params.get('lang')])
//     return (
//         <>
//             {loading ? <Loader /> : ""}
//             <form className='ServicesFrom' onSubmit={(e) => {
//                 e.preventDefault()
//             }}>
//                 <div className="ServicesFrom_top">
//                     <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.SERVICES}>Добавление услуга</Link></button>
//                     <button className='ServicesFrom_top-Edit btnopacity'>Edit</button>
//                     <button className='ServicesFrom_top-delete btnopacity'>Delete</button>
//                     <button className='ServicesFrom_top-Cancel'>Cancel</button>
//                     <button className='ServicesFrom_top-Publish' onClick={handleSubmit(HandleAddWebsite)}>Publish</button>
//                 </div>
//                 <div className="ServicesFrom_from" >
//                     <ul className="ServicesFrom_from-languageslist">
//                         <li onClick={() => setSearchParams({ lang: 'uz' })} className={params.get('lang') === 'uz' ? 'activelanguage' : ''}>O'zbekcha</li>
//                         <li onClick={() => setSearchParams({ lang: 'ru' })} className={params.get('lang') === 'ru' ? 'activelanguage' : ''}>Русский</li>
//                         <li onClick={() => setSearchParams({ lang: 'tr' })} className={params.get('lang') === 'tr' ? 'activelanguage' : ''}>Türkçe</li>
//                         <li onClick={() => setSearchParams({ lang: 'en' })} className={params.get('lang') === 'en' ? 'activelanguage' : ''}>English</li>
//                     </ul>
//                     <div className='ServicesFrom_from-mid mid2'>
//                         <div className='mid2-div'>
//                             <label className='ServicesFrom_from-img img2' >
//                                 <input className='img2-img' type={"file"} onChange={hendleimg} />
//                                 <img className='ServicesFrom_from-imgvie2' src={img} alt="" width={105} height={81} />
//                             </label>
//                             {img1 && img1.map((e, i) => (
//                                 <div className='ServicesFrom_from-imgviedivcha'>
//                                     <img key={i} className='ServicesFrom_from-imgvie' src={e?.url || img} alt="" width={105} height={81} />
//                                     <div onClick={() => {
//                                         DeleteImg({ path: e?.path })
//                                         setImg1((state) => state.filter((_, index) => index !== i))
//                                     }}> X</div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className='ServicesFrom_from-mid-left'>
//                             <textarea className='ServicesFrom_from-mid-inputtitle inputtitle2' type="text" placeholder='Название услуги' onClick={(e) => e.target.classList.add("inputtagcolor")}
//                                 // ref={register}
//                                 {...register(`${params.get('lang')}_title`, {
//                                     onChange: e => {
//                                         e.target.classList.add("inputtagcolor")
//                                         e.target.style.height = "51px";
//                                         e.target.style.height = (e.target.scrollHeight) + "px";
//                                     }
//                                 })}
//                                 value={watchedFiles?.[`${params.get('lang')}_title`] || ''}
//                             // name={`${params.get('lang')}_title`}
//                             >

//                             </textarea>
//                         </div>
//                     </div>
//                     <textarea className='ServicesFrom_from-mid-inputtext' name={`${params.get('lang')}_text`} type="text" placeholder='описания' ref={register} {...register(`${params.get('lang')}_text`, {
//                         onChange: e => {

//                             e.target.style.height = "37px";
//                             e.target.style.height = (e.target.scrollHeight) + "px";
//                         }
//                     })}
//                         value={watchedFiles?.[`${params.get('lang')}_text`] || ''} >
//                     </textarea>

//                 </div>
//             </form>
//             <Toaster />
//         </>
//     )
// }
