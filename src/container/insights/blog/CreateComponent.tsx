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

  const [categoryList, setCategoryList] = useState([])

  const [selectedOptions, setSelectedOptions] = useState([])

  const isEdit = useMemo(
    () => (items?.data?.id ? true : false),
    [items?.data?.id],
  )

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This is required field'),
    description: Yup.string().required('This is required field'),
    image: Yup.mixed().test(
      'fileRequired',
      'This is a required field',
      (value: any) => {
        return value && value.length > 0
      },
    ),
    category: Yup.array()
      .min(1, 'This is required field')
      .required('This is required field'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, watch, control, setValue } =
    useForm<any>(formOptions)

  const { errors } = formState

  useEffect(() => {
    if (isEdit) {
      setValue('id', items?.data?.id)
      setValue('description', items?.data?.description)
      setValue('category', items?.data?.category)
      setValue('image', items?.data?.image)
      setValue('name', items?.data?.name)

      setSelectedOptions(
        items?.data?.category?.map((category: any) => ({
          value: category.id,
          label: category.name,
        })),
      )
      setEditorValue(items?.data?.description)
    }
  }, [isEdit])

  const getBlogType = async () => {
    try {
      const response = await apiHandler.get(`${API_URLS.GET_BLOG_CATEGORY_API}`)
      setCategoryList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBlogType()
  }, [])

  const BlogTypeOptions = useMemo(
    () =>
      categoryList?.map((hrL: any) => ({
        label: hrL.name,
        value: hrL.id,
      })),

    [categoryList],
  )

  const handleEditorChange = (value: string) => {
    setEditorValue(value)
    setValue('description', value, { shouldValidate: true })
  }

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions)
    setValue(
      'category',
      selectedOptions?.map((sO: any) => ({ id: sO.value })),
      { shouldValidate: true },
    )
  }

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()
    formData.append('description', requestObject?.description)
    formData.append('name', requestObject?.name)
    if (
      requestObject?.image &&
      requestObject?.image?.length != 0 &&
      isFileList(requestObject?.image)
    ) {
      formData.append('image', requestObject?.image?.[0])
    }

    if (requestObject?.category && requestObject?.category.length > 0) {
      for (let i = 0; i < requestObject?.category.length; i++) {
        formData.append('category', requestObject?.category[i]?.id)
      }
    }

    if (isEdit) {
      formData.append('id', requestObject?.id)
      try {
        const resp = await apiHandler.patch(
          API_URLS.BLOG_API,
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
          API_URLS.BLOG_API,
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
    BlogTypeOptions,
    getBlogType,
    selectedOptions,
  }

  return <Child {...childprops} />
}

export default CreateComponent
