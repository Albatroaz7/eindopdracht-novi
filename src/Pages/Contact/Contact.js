import React from 'react';
import './Contact.css'
import {useForm} from "react-hook-form";

export default function Contact(){

    const { register, handleSubmit } = useForm();

    function onSubmit(data){
        console.log(data)
    }

    return(
        <div className='contact-container'>
            <form className='contact-form' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='firstName'/>
                <input
                    name='firstname'
                    type='text'
                    placeholder='First Name'
                    ref={register({required: true})}
                />

                <label htmlFor='lastName'/>
                <input
                    name='lastname'
                    type='text'
                    placeholder='Last Name'
                    ref={register({required: true})}
                />


                <label htmlFor='email'/>
                <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    ref={register({required: true})}
                />

                <label htmlFor='comment'/>
                <input className='contact-comment'
                    name='comments'
                    type='textarea'
                    placeholder='Write your comment here'
                    ref={register({required: true})}
                />

                <input className='contact-submit'
                    type='submit'
                />

            </form>

        </div>
    )
}
