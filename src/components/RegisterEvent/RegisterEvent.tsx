'use client'

import React, { useState } from 'react'
import { cn, isFileList } from '@/utils/utils'
import { API_URLS } from '@/constants/ApiRoutes'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'sonner'
import _ from 'lodash'
import { CircularProgress } from '@mui/material'
import { Button } from '../ButtonComponent'

const RegisterEvent = ({ id }: any) => {
  const [loading, setLoading] = useState(false)

  // form validation rules
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be digits only')
      .min(10, 'Phone number must be at least 10 digits')
      .required('This is required field'),
    address: Yup.string().required('This is a required field'),
    last_name: Yup.string().required('This is a required field'),
    first_name: Yup.string().required('This is a required field'),
    email: Yup.string()
      .email('Invalid email address')
      .required('This is a required field'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    formState,
    watch,
    control,
    setValue,
    reset,
    resetField,
  } = useForm<any>(formOptions)

  const { errors } = formState

  const fieldsToClear = [
    'email',
    'first_name',
    'last_name',
    'middle_name',
    'phone',
    'address',
  ]

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()

    formData.append('email', requestObject?.email)
    formData.append('first_name', requestObject?.first_name)
    formData.append('last_name', requestObject?.last_name)
    formData.append('phone', requestObject?.phone)
    formData.append('address', requestObject?.address)
    formData.append('event', id)
    if (requestObject?.middle_name && requestObject?.middle_name?.trim()) {
      formData.append('middle_name', requestObject?.middle_name)
    }

    try {
      const response = await fetch(API_URLS.BOOK_EVENTS_API, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error()
      }

      reset()
      fieldsToClear.forEach((field: any) => resetField(field))
      fieldsToClear.forEach((field: any) => setValue(field, ''))
      setLoading(false)
      toast.success('🎉 You are In! Registration Successful.')
    } catch (error) {
      toast.error('Something went wrong.')
      setLoading(false)
    }
  }
  return (
    <div className="w-full flex flex-col gap-[1.25rem]">
      <div className="grid md:grid-cols-3 gap-[1.25rem]">
        <input
          {...register('first_name')}
          type="text"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.first_name,
            },
          )}
          placeholder="First Name"
        />
        <input
          {...register('middle_name')}
          type="text"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.middle_name,
            },
          )}
          placeholder="Middle Name"
        />
        <input
          {...register('last_name')}
          type="text"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.last_name,
            },
          )}
          placeholder="Last Name"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-[1.25rem]">
        <input
          {...register('email')}
          type="email"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.email,
            },
          )}
          placeholder="Email Address"
        />
        <input
          {...register('address')}
          type="email"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.address,
            },
          )}
          placeholder="Address"
        />
        <input
          {...register('phone')}
          type="email"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.phone,
            },
          )}
          placeholder="Phone Number"
        />
      </div>

      <div className="">
        <Button
          variant={'primary'}
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className=" text-white py-[0.625rem] w-[8.75rem] text-[1rem]"
        >
          Register
          {loading && (
            <CircularProgress color="inherit" size={15} className="ml-2" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default RegisterEvent
