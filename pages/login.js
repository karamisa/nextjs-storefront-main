import Layout from '@/components/Layout'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getError } from '@/utils/error'
import { toast } from 'react-toastify'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


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
        formState: { errors },
    } = useForm();

    const submitHandler = async ({email, password}) => {
        try {

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
      <Layout title="Login">
          <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
              <h1 className='mb-4 text-xl'>Login</h1>
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
                  className='w-full' id='email' autoFocus></input>
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
                  <button className='primary-button'
                      type='submit'
                  >Login</button>
              </div>
              <div className='mb-4'>
                  Don&apos;t have an account? &nbsp;
                  <Link href="register">Register</Link>
              </div>
          </form>
      </Layout>
  );
}
