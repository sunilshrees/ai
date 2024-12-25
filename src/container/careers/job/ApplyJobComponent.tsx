'use client'

import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as Yup from 'yup'
import Child from './child/ApplyChild'
import { isFileList } from '@/utils/utils'

const ApplyJobComponent = (props: any) => {
  const { items } = props

  const [loading, setLoading] = useState(false)

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This is required field'),
    email: Yup.string().email().required('This is required field'),
    number: Yup.string().required('This is required field'),
    address: Yup.string().required('This is required field'),
    resume: Yup.mixed().test(
      'fileRequired',
      'This is a required field',
      (value: any) => {
        return value && value.length > 0
      },
    ),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, watch, control, setValue } =
    useForm<any>(formOptions)

  const { errors } = formState

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()
    formData.append('name', requestObject?.name)
    formData.append('email', requestObject?.email)
    formData.append('number', requestObject?.number)
    formData.append('address', requestObject?.address)
    formData.append('job', items?.id)

    if (
      requestObject?.resume &&
      requestObject?.resume?.length != 0 &&
      isFileList(requestObject?.resume)
    ) {
      formData.append('resume', requestObject?.resume?.[0])
    }

    try {
      const resp = await apiHandler.post(
        API_URLS.APPLY_JOBS_API,
        formData,
        null,
        true,
        false,
      )
      setLoading(false)
      toast.success('Application Submitted! Thank you for applying.')
      props.callback()
    } catch (error) {
      toast.error('Something went wrong.')
      setLoading(false)
    }
  }

  const childprops = {
    register,
    handleSubmit,
    onSubmit,
    loading,
    watch,
    errors,
    closeFunction: props.callback,
  }

  return <Child {...childprops} />
}

export default ApplyJobComponent
