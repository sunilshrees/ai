'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ButtonComponent'
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import apiHandler from '@/utils/apiHandler'
import { API_URLS } from '@/constants/ApiRoutes'
import { cn } from '@/utils/utils'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>({})

  const router = useRouter()

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm<any>(formOptions)

  const { errors } = formState

  async function onSubmit({ email, password }: any) {
    setLoading(true)
    setError({})
    try {
      const resp = await apiHandler.login(API_URLS.LOGIN_API, email, password)
      setLoading(false)
      router.push('/dashboard/home/hero-section')
    } catch (error) {
      toast.error('Unauthorized User.')
      setLoading(false)
      setError(error)
    }
  }

  return (
    <div className="min-h-screen w-full h-full flex justify-center items-center text-white">
      <div className="px-6 md:px-0 w-full md:w-auto md:min-w-[450px] h-fit flex flex-col items-center">
        <h1 className="font-faustina  text-[25px] font-semibold relative login w-full text-center mb-[50px]">
          Login Dashboard
        </h1>
        <div className="w-full mb-[30px]">
          <div className="w-full flex flex-col  gap-y-[10px] mb-[10px]">
            <label htmlFor="email" className="text-[16px] mb-[10px]">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className={cn(
                'w-full flex-1 ring-0 outline-none  px-[15px] py-[8px] rounded-[10px] bg-[#F4F4F4] text-black placeholder:text-black border',

                {
                  'border-red-600': errors?.email?.message,
                },
              )}
            />
          </div>
          <div className="w-full flex flex-col  gap-y-[10px]">
            <label htmlFor="password" className="text-[16px] mb-[10px]">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              className={cn(
                'w-full flex-1 ring-0 outline-none px-[15px] py-[8px] rounded-[10px] bg-[#F4F4F4] text-black placeholder:text-black border',
                {
                  'border-red-600': errors?.password?.message,
                },
              )}
            />
          </div>
        </div>
        {error.message && (
          <div className="flex justify-center items-center mb-4 text-red-600 text-[16px]">
            {error.message}
          </div>
        )}
        <Button
          className="mb-[20px] w-full sm:w-[450px] h-[45px] flex justify-center items-center rounded-[5px] bg-primary border-none text-white font-poppins text-[18px] font-normal"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          Login
          {loading && (
            <CircularProgress color="inherit" size={15} className="ml-2" />
          )}
        </Button>
        <div className="w-full flex justify-end items-center text-[16px]">
          <button>Forget Password?</button>
        </div>
      </div>
    </div>
  )
}

export default Login
