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
    name: Yup.string().required('This is a required field'),
    link: Yup.string()
      .url('Must be a valid URL')
      .required('This is a required field'),
    logo: Yup.mixed().test(
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
      setValue('name', items?.data?.name)
      setValue('link', items?.data?.link)
      setValue('logo', items?.data?.logo)
    }
  }, [isEdit])

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()
    formData.append('name', requestObject?.name)
    formData.append('link', requestObject?.link)
    if (
      requestObject?.logo &&
      requestObject?.logo?.length != 0 &&
      isFileList(requestObject?.logo)
    ) {
      formData.append('logo', requestObject?.logo?.[0])
    }

    if (isEdit) {
      formData.append('id', requestObject?.id)
      try {
        const resp = await apiHandler.patch(
          API_URLS.CLIENT_SECTION_API,
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
          API_URLS.CLIENT_SECTION_API,
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

  console.log(watch(), 'watch')

  return <Child {...childprops} />
}

export default CreateComponent
