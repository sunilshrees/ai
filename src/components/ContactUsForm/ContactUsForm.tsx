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

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)

  // form validation rules
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be digits only')
      .min(10, 'Phone number must be at least 10 digits')
      .required('This is required field'),
    message: Yup.string().required('This is a required field'),
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
    'message',
  ]

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()

    formData.append('email', requestObject?.email)
    formData.append('first_name', requestObject?.first_name)
    formData.append('last_name', requestObject?.last_name)
    formData.append('phone', requestObject?.phone)
    formData.append('message', requestObject?.message)
    if (requestObject?.middle_name && requestObject?.middle_name?.trim()) {
      formData.append('middle_name', requestObject?.middle_name)
    }

    try {
      const response = await fetch(API_URLS.ADD_INQUIRY_API, {
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
      toast.success(
        '✅ Message Sent! We will get back to you soon. Thank you for reaching out!',
      )
    } catch (error) {
      toast.error('Something went wrong.')
      setLoading(false)
    }
  }
  return (
    <div className="w-full flex flex-col gap-[1.25rem]">
      <div className="grid md:grid-cols-3 gap-[1.25rem]">
        {/* <input
          type="text"
          placeholder="First Name"
          className="px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent"
        /> */}
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
      <div className="grid md:grid-cols-2 gap-[1.25rem]">
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
      <div>
        <textarea
          {...register('message')}
          className={cn(
            'w-full px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.message,
            },
          )}
          placeholder="Write your message.."
          rows={4}
        />
      </div>
      <div className="w-full flex justify-end items-center">
        <Button
          variant={'primary'}
          className="!w-fit px-[1rem]  !rounded-[10px] !bg-primary border-none active:!bg-white active:text-primary"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          Send Message
          {loading && (
            <CircularProgress color="inherit" size={15} className="ml-2" />
          )}
        </Button>
      </div>
    </div>
    // <div className="w-full flex flex-col items-center gap-[1.25rem] font-montserrat">
    //   <h1 className="font-clash-display font-normal text-[1.125rem] text-[#D9D9D9]">
    //     Get the Latest Updates!
    //   </h1>
    //   <div className="flex justify-center items-center rounded-[10px] border border-primary">
    //     <input
    //       {...register('email')}
    //       type="text"
    //       className={cn(
    //         'py-[0.625rem] px-[1.25rem] bg-transparent ring-0 outline-none w-[250px] md:w-[500px] border-none flex-1',
    //         {
    //           'border-red-500 border': errors?.email,
    //         },
    //       )}
    //       placeholder="Enter your email"
    //     />
    //     <Button
    //       variant={'secondary'}
    //       className="!w-auto px-[1rem]  rounded-l-none !rounded-r-[10px] !bg-primary border-none active:!bg-white active:text-primary"
    //       onClick={handleSubmit(onSubmit)}
    //       disabled={loading}
    //     >
    //       Join
    //       {loading && (
    //         <CircularProgress color="inherit" size={15} className="ml-2" />
    //       )}
    //     </Button>
    //   </div>
    // </div>
  )
}

export default ContactUsForm
