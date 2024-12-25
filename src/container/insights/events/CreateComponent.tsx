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
  const [editorValue, setEditorValue] = useState('')

  const { items } = props

  const [loading, setLoading] = useState(false)

  const [detailsArray, setDetailsArray] = useState<any>([])

  const [categoryList, setCategoryList] = useState([])

  const [selectedOptions, setSelectedOptions] = useState([])

  const getEventsType = async () => {
    try {
      const response = await apiHandler.get(`${API_URLS.GET_EVENTS_TYPE_API}`)
      setCategoryList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEventsType()
  }, [])

  const EventsTypeOptions = useMemo(
    () =>
      categoryList?.map((hrL: any) => ({
        label: hrL.name,
        value: hrL.id,
      })),

    [categoryList],
  )

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions)
    setValue(
      'type',
      selectedOptions?.map((sO: any) => ({ id: sO.value })),
      { shouldValidate: true },
    )
  }

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
    event_time: Yup.string().required('This is required field'),
    event_date: Yup.string().required('This is required field'),
    image: Yup.mixed().test(
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

  const handleEditorChange = (value: string) => {
    setEditorValue(value)
    setValue('description', value, { shouldValidate: true })
  }

  console.log(watch(), 'watchvalues')

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()
    formData.append('name', requestObject?.name)
    formData.append('description', requestObject?.description)
    formData.append('event_date', requestObject?.event_date)
    if (requestObject?.price) {
      formData.append('price', requestObject?.price)
    }
    formData.append('event_time', requestObject?.event_time)

    if (requestObject?.type && requestObject?.type.length > 0) {
      for (let i = 0; i < requestObject?.type.length; i++) {
        formData.append('type', requestObject?.type[i]?.id)
      }
    }

    if (data?.image && data?.image?.length != 0 && isFileList(data?.image)) {
      formData.append('image', data?.image?.[0])
    }

    if (requestObject?.details && requestObject?.details.length > 0) {
      for (let i = 0; i < requestObject?.details.length; i++) {
        formData.append('speaker_name', requestObject?.details[i]?.name)
        formData.append('speaker_image', requestObject?.details[i]?.image?.[0])
        formData.append('speaker_position', requestObject?.details[i]?.position)
        formData.append(
          'speaker_organization',
          requestObject?.details[i]?.organization,
        )
      }
    }

    try {
      const resp = await apiHandler.post(
        API_URLS.EVENTS_API,
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
    EventsTypeOptions,
    getEventsType,
    selectedOptions,
    handleSelectChange,
  }

  console.log(detailsArray, 'detaioslsar array')

  return <Child {...childprops} />
}

export default CreateComponent
