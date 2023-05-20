import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


import { Loginuser } from '../../shared/api/auth';

import routes from '../../shared/constants/routes';

import { setCookie, getCookie } from 'typescript-cookie'
export default function LoginPage() {
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const navigate = useNavigate()
    const loginSubmit = async (data) => {
        const res = await Loginuser(data)
        console.log(res)
        if (res.status == 200) {
            setCookie('accesToken', res?.data?.token);
            navigate(routes.HOME)
        } else {
            alert('failed')
        }
    };
    return (
        <div className='login'>
            <form className='login-from'>
                <p className='login-text'>Введите логин и пароль для админ-панели.</p>
                <input className='login-input' type="text" placeholder='Login'
                    {...register("name", {
                        required: true,
                    })} />
                <input className='login-input' type={"password"} placeholder='Password'
                    {...register("password", {
                        required: true,
                    })} />
                <button className='login-btn' onClick={handleSubmit(loginSubmit)}>login</button>
            </form>
        </div>
    )
}
