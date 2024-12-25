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

  const getDetailsArray = async () => {
    setLoadingDetails(true)
    try {
      const response = await apiHandler.post(`${API_URLS.GET_SPEAKERS_API}`, {
        id: items?.data?.id,
      })
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
      setValue('event_time', items?.data?.event_time)
      setValue('event_date', items?.data?.event_date)
      setValue('type', items?.data?.type)
      setValue('image', items?.data?.image)
      setValue('name', items?.data?.name)
      setValue('price', items?.data?.price)
      setValue('description', items?.data?.description)

      setSelectedOptions(
        items?.data?.type?.map((ty: any) => ({
          value: ty.id,
          label: ty.name,
        })),
      )
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
        `${API_URLS.SPEAKERS_API}`,
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

    formData.append('name', data?.name)
    formData.append('organization', data?.organization)
    formData.append('position', data?.position)
    if (data?.image && data?.image?.length != 0 && isFileList(data?.image)) {
      formData.append('image', data?.image?.[0])
    }

    if (data?.id) {
      formData.append('id', data?.id)

      try {
        const resp = await apiHandler.patch(
          API_URLS.SPEAKERS_API,
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

      try {
        const resp = await apiHandler.post(
          API_URLS.SPEAKERS_API,
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

    try {
      const resp = await apiHandler.patch(
        API_URLS.EVENTS_API,
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
    getEventsType,
    selectedOptions,
    handleSelectChange,
    EventsTypeOptions,
  }

  return <Child {...childprops} />
}

export default EditComponent
