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

const CreateComponent = (props: any) => {
  const [editorValue, setEditorValue] = useState('')

  const { items } = props

  const [loading, setLoading] = useState(false)

  const [detailsArray, setDetailsArray] = useState<any>([])

  const handleDetailsArray = (data: any) => {
    setDetailsArray((prev: any) => {
      const oldData = prev

      const updated = [...oldData, data]

      setValue('details', updated, { shouldValidate: true })

      return updated
    })
  }

  const handleRemoveDetails = (data: any) => {
    setDetailsArray((prev: any) => {
      const oldData = prev

      const updated = oldData.filter((de: any) => de.name != data.name)

      setValue('details', updated, { shouldValidate: true })

      return updated
    })
  }

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This is required field'),
    description: Yup.string().required('This is required field'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, watch, control, setValue } =
    useForm<any>(formOptions)

  const { errors } = formState

  const handleEditorChange = (value: string) => {
    setEditorValue(value)
    setValue('description', value, { shouldValidate: true })
  }

  console.log(watch(), 'watchvalues')

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = requestObject

    try {
      const resp = await apiHandler.post(
        API_URLS.INDUSTRY_API,
        requestObject,
        null,
        true,
        true,
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
    handleRemoveDetails,
    handleDetailsArray,
    detailsArray,
  }

  console.log(detailsArray, 'detaioslsar array')

  return <Child {...childprops} />
}

export default CreateComponent
