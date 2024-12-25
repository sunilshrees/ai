'use client'

import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as Yup from 'yup'
import Child from './child'
import { isFileList } from '@/utils/utils'

const CreateComponent = (props: any) => {
  const { items } = props

  const [loading, setLoading] = useState(false)

  const isEdit = useMemo(
    () => (items?.data?.id ? true : false),
    [items?.data?.id],
  )

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This is required field'),
    description: Yup.string().required('This is required field'),
    image: Yup.mixed().test(
      'fileRequired',
      'This is a required field',
      (value: any) => {
        return value && value.length > 0
      },
    ),
    video: Yup.mixed().test(
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

  useEffect(() => {
    if (isEdit) {
      setValue('id', items?.data?.id)
      setValue('title', items?.data?.title)
      setValue('description', items?.data?.description)
      setValue('image', items?.data?.image)
      setValue('video', items?.data?.video)
    }
  }, [isEdit])

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()
    if (
      requestObject?.image &&
      requestObject?.image?.length != 0 &&
      isFileList(requestObject?.image)
    ) {
      formData.append('image', requestObject?.image?.[0])
    }
    if (
      requestObject?.video &&
      requestObject?.video?.length != 0 &&
      isFileList(requestObject?.video)
    ) {
      formData.append('video', requestObject?.video?.[0])
    }
    formData.append('title', requestObject?.title)
    formData.append('description', requestObject?.description)

    if (isEdit) {
      formData.append('id', requestObject?.id)
      try {
        const resp = await apiHandler.patch(
          API_URLS.HERO_SECTION_API,
          false,
          formData,
          true,
          false,
        )
        setLoading(false)
        toast.success('Updated successfully.')
        props.callFunction()
        props.callback()
      } catch (error) {
        setLoading(false)
        toast.error('Something went wrong')
      }
    } else {
      try {
        const resp = await apiHandler.post(
          API_URLS.HERO_SECTION_API,
          formData,
          null,
          true,
          false,
        )
        setLoading(false)
        toast.success('Created successfully.')
        props.callFunction()
        props.callback()
      } catch (error) {
        toast.error('Something went wrong.')

        setLoading(false)
      }
    }
  }

  const childprops = {
    isEdit,
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

export default CreateComponent
