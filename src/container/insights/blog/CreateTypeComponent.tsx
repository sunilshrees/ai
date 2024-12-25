'use client'

import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as Yup from 'yup'
import Child from './child/typeChild'
import { isFileList } from '@/utils/utils'

const CreateTypeComponent = (props: any) => {
  const { items } = props

  const [loading, setLoading] = useState(false)

  const isEdit = useMemo(
    () => (items?.data?.id ? true : false),
    [items?.data?.id],
  )

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This is required field'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, watch, control, setValue } =
    useForm<any>(formOptions)

  const { errors } = formState

  useEffect(() => {
    if (isEdit) {
      setValue('id', items?.data?.id)

      setValue('name', items?.data?.title)
    }
  }, [isEdit])

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()
    formData.append('name', requestObject?.name)

    if (isEdit) {
      formData.append('id', requestObject?.id)
      try {
        const resp = await apiHandler.patch(
          API_URLS.BLOG_CATEGORY_API,
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
          API_URLS.BLOG_CATEGORY_API,
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

export default CreateTypeComponent
