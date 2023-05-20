// import React, { useEffect, useState } from 'react'
// import img from "../../assets/images/Group48098387.png";

// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import routes from '../../shared/constants/routes';
// import { useForm } from 'react-hook-form';
// import { createService } from '../../shared/api/service';
// import { DeleteImg, UploadImg } from '../../shared/api/multer';
// import toast, { Toaster } from 'react-hot-toast';
// import Loader from '../ul/loader/Loader';
// export default function ServicesAddFrom() {
//     const navgate = useNavigate()
//     const [params, setSearchParams] = useSearchParams()
//     const { register, handleSubmit, control, formState: { errors }, watch } = useForm();
//     const watchedFiles = watch()

//     const [img1, setImg1] = useState([])

//     const [loading, setLoading] = useState(false)

//     const HandleAddWebsite = async (data) => {

//         await createService({ img: img1, ...data })
//             .then((response) => {
//                 if (response.status == 200) {
//                     setLoading(false)
//                     toast("item updated")
//                     navgate(routes.SERVICES)
//                 } else {
//                     toast('please try again')
//                 }
//             })
//             .catch(error => {
//                 setLoading(false)
//                 toast(error.message)

//             })

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
//             {loading ? <Loader /> : ''}
//             <form className='ServicesFrom'>
//                 <div className="ServicesFrom_top">
//                     <button className='ServicesFrom_top-back'><Link className='ServicesFrom_top-back2' to={routes.SERVICES}>Добавление услуга</Link></button>
//                     <button className='ServicesFrom_top-Edit btnopacity' onClick={() => navgate(routes.SERVICES)}>Edit</button>
//                     <button className='ServicesFrom_top-delete btnopacity' onClick={() => navgate(routes.SERVICES)}>Delete</button>
//                     <button className='ServicesFrom_top-Cancel' onClick={() => navgate(routes.SERVICES)}>Cancel</button>
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
//                                 {...register(`${params.get('lang')}_title`, {
//                                     onChange: e => {
//                                         e.target.classList.add("inputtagcolor")
//                                         e.target.style.height = "51px";
//                                         e.target.style.height = (e.target.scrollHeight) + "px";
//                                     }
//                                 })}
//                                 value={watchedFiles?.[`${params.get('lang')}_title`] || ''}
//                             >

//                             </textarea>
//                         </div>
//                     </div>
//                     <textarea className='ServicesFrom_from-mid-inputtext' name="text" type="text" placeholder='описания'
//                         {...register(`${params.get('lang')}_text`, {
//                             onChange: e => {

//                                 e.target.style.height = "37px";
//                                 e.target.style.height = (e.target.scrollHeight) + "px";
//                             }
//                         })}
//                         value={watchedFiles?.[`${params.get('lang')}_text`] || ''}
//                     >

//                     </textarea>
//                 </div>
//             </form>
//             <Toaster />
//         </>
//     )
// }
