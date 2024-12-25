'use client'

import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as Yup from 'yup'
import Child from './child/EditChild'
import { openModal } from '@/utils/openModal'
import CreateComponentService from './CreateComponentService'
import { isFileList } from '@/utils/utils'
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'

const EditComponent = (props: any) => {
  const [editorValue, setEditorValue] = useState('')

  const { items } = props

  const [loading, setLoading] = useState(false)

  const [loadingDetails, setLoadingDetails] = useState(false)

  const [detailsArray, setDetailsArray] = useState<any>([])

  const getDetailsArray = async () => {
    setLoadingDetails(true)
    try {
      const response = await apiHandler.post(
        `${API_URLS.GET_PRODUCT_DETAILS_API}`,
        { id: items?.data?.id },
      )
      setDetailsArray(response.data)
      setLoadingDetails(false)
    } catch (error) {
      console.log(error)
      setLoadingDetails(false)
    }
  }

  useEffect(() => {
    if (items?.data?.id) {
      getDetailsArray()
      setValue('id', items?.data?.id)
      setValue('name', items?.data?.name)
      setValue('description', items?.data?.description)

      setEditorValue(items?.data?.description)
    }
  }, [items?.data?.id])

  const handleClickAdd = () => {
    openModal(
      CreateComponentService,
      { id: items?.data?.id },
      {
        height: '',
        width: '600px',
        borderRadius: '8px',

        closeOnClickOutside: true,
      },
      (data: any) => {
        handleDetailsAction(data)
      },
    )
  }
  const handleClickEdit = (editData: any) => {
    openModal(
      CreateComponentService,
      { data: editData },
      {
        height: '90vh',
        width: '600px',
        borderRadius: '8px',
        closeOnClickOutside: false,
      },
      (data: any) => {
        handleDetailsAction(data)
      },
    )
  }

  const handleDelete = async (id: any) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.PRODUCT_DETAILS_API}`,
        false,
        {
          id,
        },
      )
      getDetailsArray(), toast.success('Deleted successfully.')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    }
  }

  const handleClickDelete = (id: any) => {
    openModal(
      ConfirmationModal,
      null,
      {
        height: '',
        width: '372px',
        borderRadius: '8px',

        closeOnClickOutside: true,
      },
      () => {
        handleDelete(id)
      },

      {
        heading: 'Confirm Delete',
        title: 'Are you sure you want to delete this ?',
        approveText: 'Yes',
      },
    )
  }

  const handleDetailsAction = async (data: any) => {
    let formData = new FormData()

    if (data?.id) {
      formData.append('id', data?.id)
      formData.append('name', data?.name)
      formData.append('description', data?.description)
      if (data?.icon && data?.icon?.length != 0 && isFileList(data?.icon)) {
        formData.append('icon', data?.icon?.[0])
      }

      try {
        const resp = await apiHandler.patch(
          API_URLS.PRODUCT_DETAILS_API,
          false,
          formData,
          true,
          false,
        )
        getDetailsArray()
      } catch (error) {
        toast.error('Something went wrong.')
      }
    } else {
      formData.append('id', items?.data?.id)
      formData.append('name', data?.name)
      formData.append('description', data?.description)
      if (data?.icon && data?.icon?.length != 0 && isFileList(data?.icon)) {
        formData.append('icon', data?.icon?.[0])
      }

      try {
        const resp = await apiHandler.post(
          API_URLS.PRODUCT_DETAILS_API,
          formData,
          null,
          true,
          false,
        )
        getDetailsArray()
      } catch (error) {
        toast.error('Something went wrong.')
      }
    }
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
    formData.append('id', requestObject?.id)

    formData.append('name', requestObject?.name)
    formData.append('description', requestObject?.description)

    try {
      const resp = await apiHandler.patch(
        API_URLS.PRODUCT_API,
        false,
        formData,
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
    loadingDetails,
    handleClickEdit,
    handleClickAdd,
    handleClickDelete,
  }

  console.log(detailsArray, 'detaioslsar array')

  return <Child {...childprops} />
}

export default EditComponent
