import Layout from '@/components/Layout'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getError } from '@/utils/error'
import { toast } from 'react-toastify'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'


export default function LoginScreen() {

   const { data: session } = useSession();

   const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({name, email, password}) => {
        try {
            await axios.post('/api/auth/signup', {name, email, password});

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                });
                if (result.error) {
                    toast.error(result.error);
                } 
        } catch (error) {
            toast.error(getError(error));
           
        }
    };
        


  return (
      <Layout title="Create Acount">
          <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
              <h1 className='mb-4 text-xl'>Create Acount</h1>
              <div className='mb-4'>
                  <label htmlFor='name'>Name</label>
                  <input type='text'
                      className='w-full'
                      id='name'
                      autoFocus
                      {...register('name', {
                          required: 'Please enter your name',
                          minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters',
                          },
                          maxLength: {
                              value: 50,
                              message: 'Name cannot be more than 50 characters',
                          },
                      })}
                      />
                  {errors.name && (
                      <div className='text-red-500'>{errors.name.message}</div>
                  )}
              </div>
              <div className='mb-4'>
                  <label htmlFor='email'>Email</label>
                  <input type='email'
                      {...register('email', {
                          required: 'Please enter your email address',
                          pattern: {
                              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                              message: 'Please enter a valid email address',                       
                          },
                      })}
                  className='w-full' id='email'></input>
                  {errors.email && (
                      <span className='text-red-500'>{errors.email.message}</span>
                  )}
              </div>

              <div className='mb-4'>
                  <label htmlFor='password'>Password</label>
                  <input type='password' 
                      {...register('password', {
                          required: 'Please enter your password',
                          minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters',
                          },
                      })}
                  className='w-full' id='password'></input>
                  {errors.password && (
                      <span className='text-red-500'>{errors.password.message}</span>
                  )}
              </div>

              <div className='mb-4'>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <input type='password' 
                      {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (value) => value === getValues('password'),
                          minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters',
                          },
                      })}
                  className='w-full' id='password'/>
                  {errors.confirmPassword && (
                      <div className='text-red-500'>{errors.confirmPassword.message}</div>
                  )}
                  {errors.confirmPassword && 
                      errors.confirmPassword.type === 'validate' && (
                          <div className='text-red-500'>Passwords do not match</div>
                      )}  
              </div>

              <div className='mb-4'>
                  <button className='primary-button'
                      type='submit'
                  >Login</button>
              </div>
              <div className='mb-4'>
                  Don&apos;t have an account? &nbsp;
                  <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link> 
              </div>
          </form>
      </Layout>
  );
}
