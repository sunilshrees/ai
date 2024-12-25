'use client'

import React, { useState } from 'react'
import { Button } from './ButtonComponent'
import { cn, isFileList } from '@/utils/utils'
import { API_URLS } from '@/constants/ApiRoutes'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'sonner'
import _ from 'lodash'
import { CircularProgress } from '@mui/material'

const GetLatestUpdates = () => {
  const [loading, setLoading] = useState(false)

  // form validation rules
  const validationSchema = Yup.object().shape({
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

  const fieldsToClear = ['email']

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()

    formData.append('email', requestObject?.email)

    try {
      const response = await fetch(API_URLS.SUBSCRIBE_API, {
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
        '🎉 Subscription Updated! You are now all set to receive the latest updates.',
      )
    } catch (error) {
      toast.error('Something went wrong.')
      setLoading(false)
    }
  }
  return (
    <div className="w-full flex flex-col items-center gap-[1.25rem] font-montserrat">
      <h1 className="font-clash-display font-normal text-[1.125rem] text-[#D9D9D9]">
        Get the Latest Updates!
      </h1>
      <div className="flex justify-center items-center rounded-[10px] border border-primary">
        <input
          {...register('email')}
          type="text"
          className={cn(
            'py-[0.625rem] px-[1.25rem] bg-transparent ring-0 outline-none w-[250px] md:w-[500px] border-none flex-1',
            {
              'border-red-500 border': errors?.email,
            },
          )}
          placeholder="Enter your email"
        />
        <Button
          variant={'secondary'}
          className="!w-auto px-[1rem]  rounded-l-none !rounded-r-[10px] !bg-primary border-none active:!bg-white active:text-primary"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          Join
          {loading && (
            <CircularProgress color="inherit" size={15} className="ml-2" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default GetLatestUpdates
