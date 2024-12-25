import SelectField from '@/components/SelectComponent/SelectField'
import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { isFile, isFileList } from '@/utils/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'
import _ from 'lodash'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as Yup from 'yup'

const AddComponent = (props: any) => {
  const { items } = props

  const [loading, setLoading] = useState(false)
  const [imageList, setImageList] = useState<any>([])

  const isEdit = useMemo(
    () => (items?.data?.id ? true : false),
    [items?.data?.id],
  )

  // form validation rules
  const validationSchema = Yup.object().shape({
    description: Yup.string().required('This is required field'),
    image: Yup.mixed().test(
      'fileRequired',
      'This is required field',
      (value: any) => {
        return value && value.length > 0
      },
    ),
  })
  // form validation rules
  const validationSchema1 = Yup.object().shape({
    description: Yup.string().required('This is required field'),
  })

  const formOptions = {
    resolver: yupResolver(!isEdit ? validationSchema : validationSchema1),
  }

  useEffect(() => {
    if (isEdit) {
      setValue('description', items?.data?.description)
      setValue('image', items?.data?.images)
      setImageList(items?.data?.images)
    }
  }, [items])

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, watch, control, setValue } =
    useForm<any>(formOptions)

  const { errors } = formState

  async function onSubmit(data: any) {
    setLoading(true)

    const requestObject = _.cloneDeep(data)

    let formData = new FormData()
    formData.append('description', requestObject?.description)

    if (!isEdit) {
      if (requestObject?.image && requestObject?.image.length > 0) {
        for (let i = 0; i < requestObject?.image.length; i++) {
          formData.append('image', requestObject?.image[i])
        }
      }

      try {
        const resp = await apiHandler.post(
          API_URLS.EVENT_IMAGES_API,
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
    } else {
      formData.append('id', items?.data?.id)

      if (requestObject?.image && requestObject?.image.length > 0) {
        for (let i = 0; i < requestObject?.image.length; i++) {
          if (
            isFile(requestObject?.image[i]) ||
            isFileList(requestObject?.image[i])
          ) {
            let imageFormData = new FormData()

            imageFormData.append('id', items?.data?.id)
            imageFormData.append('image', requestObject?.image[i])

            try {
              const resp = await apiHandler.post(
                API_URLS.IMAGE_API,
                imageFormData,
                null,
                true,
                false,
              )
            } catch (error) {
              setLoading(false)
              toast.error('Something went wrong.')
            }
          }
        }
      }
      try {
        const resp = await apiHandler.patch(
          API_URLS.EVENT_IMAGES_API,
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
        toast.error('Something went wrong.')
        setLoading(false)
      }
    }
  }

  const coverPic = watch('image')

  const handleAttachmentFile = (e: any) => {
    const filesToAdd = Array.from(e.target.files)

    setImageList((prevState: any) => {
      const currentFiles = prevState

      const newFiles = filesToAdd.filter((fileToAdd: any) => {
        return !currentFiles.some(
          (currentFile: any) =>
            currentFile.name === fileToAdd.name &&
            currentFile.size === fileToAdd.size,
        )
      })

      const addedFiles = [...currentFiles, ...newFiles]

      setValue('image', addedFiles, { shouldValidate: true })

      return addedFiles
    })
  }
  const removeattachmentFile = (index: number) => {
    setImageList((prevState: any) => {
      const updatedFiles = [...prevState]
      updatedFiles.splice(index, 1)

      setValue('image', updatedFiles, { shouldValidate: true })

      return updatedFiles
    })
  }
  const removeSavedattachmentFile = async (index: number, id: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.IMAGE_API}`,
        false,
        { id },
      )
      setImageList((prevState: any) => {
        const updatedFiles = [...prevState]
        updatedFiles.splice(index, 1)

        setValue('image', updatedFiles, { shouldValidate: true })

        return updatedFiles
      })
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    }
  }

  console.log(watch())

  return (
    <div className="w-full pr-[20px] text-black">
      <div className="w-full flex justify-between items-center mb-[30px]">
        <div className="font-semibold text-[1.25rem] font-faustina w-fit border-b border-[#62B82F]">
          Add Event Image
        </div>
      </div>
      <div className="flex flex-col gap-y-[10px] mb-4">
        <label htmlFor="description" className="text-[12px] md:text-[14px]">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={5}
          placeholder=""
          className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
        />
        {errors?.description && (
          <div className="mt-1 text-red-500">
            {errors?.description?.message?.toString()}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-[10px]">
        <label htmlFor="description" className="text-[12px] md:text-[14px]">
          Select Images
        </label>
        <div className="grid grid-cols-3 gap-[10px] mb-[30px]">
          {coverPic &&
            coverPic?.length != 0 &&
            Array.from(coverPic)?.map((data: any, index: number) => {
              return (
                <div
                  className="w-full h-[120px] border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80] flex justify-center items-center relative"
                  key={index}
                >
                  {data && isFile(data) && data?.type?.includes('image/') && (
                    <div className="w-full h-[120px] relative overflow-hidden ">
                      <Image
                        src={URL.createObjectURL(data)}
                        alt="Selected Image"
                        fill
                        className="object-contain object-center"
                      />
                    </div>
                  )}
                  {data && !isFileList(data) && !isFile(data) && (
                    <div className="w-full h-[120px] relative overflow-hidden ">
                      <Image
                        src={data?.image}
                        alt="Selected Image"
                        fill
                        className="object-contain object-center"
                      />
                    </div>
                  )}
                  <div
                    className="absolute -top-3 -right-2 rounded-full w-6 h-6 bg-red-700 text-white flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      if (!isEdit) {
                        removeattachmentFile(index)
                      }
                      if (isEdit && (isFileList(data) || isFile(data))) {
                        removeattachmentFile(index)
                      }
                      if (isEdit && !isFileList(data) && !isFile(data)) {
                        removeSavedattachmentFile(index, data?.id)
                      }
                    }}
                  >
                    X
                  </div>
                </div>
              )
            })}

          <div className="flex flex-col gap-y-[10px]">
            <input
              {...register('image')}
              id="subnav-image-gallery-1"
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={(e) => handleAttachmentFile(e)}
              className="flex-1 ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] hidden bg-[#FFFFFF80]"
            />
            <label
              htmlFor="subnav-image-gallery-1"
              className="text-[12px] md:text-[14px]"
            >
              <div className="w-full h-[120px] border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80] flex justify-center items-center relative">
                <div className="w-full h-[120px]  rounded-[10px] bg-[#FFFFFF80] flex justify-center items-center">
                  <span className="text-[40px]">+</span>
                </div>
              </div>
            </label>
            {errors?.image && (
              <div className="mt-1 text-red-500">
                {errors?.image?.message?.toString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end items-center gap-[15px] text-[16px] text-white font-medium">
        <button
          className="flex justify-center items-center !w-[134px] p-[10px] !bg-[#E53535] rounded-[10px] border"
          style={{
            background: '#E53535',
            width: '134px',
            fontWeight: '400',
          }}
          onClick={() => {
            props.callback()
          }}
        >
          Cancel
        </button>
        <button
          className="flex justify-center items-center !w-[134px] p-[10px] !bg-[#05A660] rounded-[10px] border"
          style={{
            background: '#05A660',
            width: '134px',
            fontWeight: '400',
          }}
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          Save
          {loading && (
            <CircularProgress color="inherit" size={15} className="ml-2" />
          )}
        </button>
      </div>
    </div>
  )
}

export default AddComponent
