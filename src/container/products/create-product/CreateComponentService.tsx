'use client'

import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as Yup from 'yup'
import Child from './child/ServiceChild'

const CreateComponent = (props: any) => {
  const [editorValue, setEditorValue] = useState('')

  const { items } = props

  const [loading, setLoading] = useState(false)

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This is required field'),
    description: Yup.string().required('This is required field'),
    icon: Yup.mixed().test(
      'fileRequired',
      'This is a required field',
      (value: any) => {
        return value && value.length > 0
      },
    ),
  })

  const isEdit = useMemo(
    () => (items?.data?.id ? true : false),
    [items?.data?.id],
  )

  useEffect(() => {
    if (items?.data?.id) {
      setValue('id', items?.data?.id)
      setValue('name', items?.data?.name)
      setValue('description', items?.data?.description)
      setValue('icon', items?.data?.icon)

      setEditorValue(items?.data?.description)
    }
  }, [items?.data?.id])

  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, watch, control, setValue } =
    useForm<any>(formOptions)

  const { errors } = formState

  const handleEditorChange = (value: string) => {
    setEditorValue(value)
    setValue('description', value, { shouldValidate: true })
  }

  async function onSubmit(data: any) {
    const watchValues = watch()
    const requestObject = _.cloneDeep(watchValues)
    props?.callFunction(requestObject)
    props.callback()
  }

  console.log(watch(), 'awtchhas')

  const childprops = {
    register,
    handleSubmit,
    onSubmit,
    loading,
    watch,
    errors,
    closeFunction: props.callback,
    setEditorValue,
    editorValue,
    handleEditorChange,
    isEdit,
  }

  return <Child {...childprops} />
}

export default CreateComponent
