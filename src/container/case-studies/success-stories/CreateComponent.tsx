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

  const [typeList, setTypeList] = useState([])

  const [selectedOptions, setSelectedOptions] = useState([])

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
    type: Yup.array()
      .min(1, 'This is required field')
      .required('This is required field'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, watch, control, setValue } =
    useForm<any>(formOptions)

  const { errors } = formState

  const getCaseStudies = async (id: any) => {
    try {
      const response = await apiHandler.post(
        `${API_URLS.GET_CASE_STUDIES_API}`,
        {
          id,
        },
      )

      if (response?.data) {
        setValue('id', response?.data?.id)
        setValue('description', response?.data?.description)
        setValue('type', response?.data?.type)
        setValue('image', response?.data?.image)
        setValue('title', response?.data?.title)

        setSelectedOptions(
          response?.data?.type?.map((type: any) => ({
            value: type.id,
            label: type.name,
          })),
        )

        setEditorValue(response?.data?.description)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isEdit && items?.data?.id) {
      getCaseStudies(items?.data?.id)
    }
  }, [isEdit])

  const getCaseStudyType = async () => {
    try {
      const response = await apiHandler.get(`${API_URLS.CASE_STUDIES_TYPE_API}`)
      setTypeList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCaseStudyType()
  }, [])

  const CaseStudyOptions = useMemo(
    () =>
      typeList?.map((hrL: any) => ({
        label: hrL.name,
        value: hrL.id,
      })),

    [typeList],
  )

  const handleEditorChange = (value: string) => {
    setEditorValue(value)
    setValue('description', value, { shouldValidate: true })
  }

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions)
    setValue(
      'type',
      selectedOptions?.map((sO: any) => ({ id: sO.value })),
      { shouldValidate: true },
    )
  }

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()
    formData.append('description', requestObject?.description)
    formData.append('title', requestObject?.title)
    if (
      requestObject?.image &&
      requestObject?.image?.length != 0 &&
      isFileList(requestObject?.image)
    ) {
      formData.append('image', requestObject?.image?.[0])
    }

    if (requestObject?.type && requestObject?.type.length > 0) {
      for (let i = 0; i < requestObject?.type.length; i++) {
        formData.append('type', requestObject?.type[i]?.id)
      }
    }

    if (isEdit) {
      formData.append('id', requestObject?.id)
      try {
        const resp = await apiHandler.patch(
          API_URLS.CASE_STUDIES_API,
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
          API_URLS.CASE_STUDIES_API,
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

  console.log(watch(), 'watchvalues')

  const childprops = {
    isEdit,
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
    handleSelectChange,
    CaseStudyOptions,
    getCaseStudyType,
    selectedOptions,
  }

  return <Child {...childprops} />
}

export default CreateComponent
