import { isFileList } from '@/utils/utils'
import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Child = (props: any) => {
  const {
    isEdit,
    register,
    handleSubmit,
    onSubmit,
    loading,
    watch,
    errors,
    closeFunction,
  } = props

  const coverPic = watch('icon')

  return (
    <div className="w-full pr-[20px] text-black">
      <div className="w-full flex justify-between items-center mb-[30px]">
        <div className="font-semibold text-[1.25rem] font-faustina w-fit border-b border-[#62B82F]">
          {isEdit ? 'Edit' : 'Create'} Social Account
        </div>
      </div>
      <div className=" w-full grid md:grid-cols-2 gap-[1rem] mb-[1.75rem] ">
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="name" className="text-[12px] md:text-[14px]">
            Name
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Facebook"
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
          {errors?.name && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.name?.message?.toString()}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="number" className="text-[12px] md:text-[14px]">
            Number
          </label>
          <input
            {...register('number')}
            type="text"
            placeholder=""
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
          {errors?.number && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.number?.message?.toString()}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-[10px] md:col-span-2">
          <label htmlFor="url" className="text-[12px] md:text-[14px]">
            Website
          </label>
          <input
            {...register('url')}
            type="text"
            placeholder="www.facebook.com"
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
          {errors?.url && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.url?.message?.toString()}
            </div>
          )}
        </div>

        <div className="w-full flex items-center gap-[0.625rem] md:col-span-2">
          <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
            <div className="flex flex-col gap-y-[10px]">
              <label htmlFor="icon" className="text-[12px] md:text-[14px]">
                Select Icon
              </label>
              <input
                {...register('icon')}
                id="subnav-image"
                type="file"
                accept="image/jpeg,image/png"
                className="flex-1 ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] hidden bg-[#FFFFFF80]"
              />
              <label
                htmlFor="subnav-image"
                className="text-[12px] md:text-[14px]"
              >
                <div className="w-full h-[120px] border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80] flex justify-center items-center relative">
                  <div className="w-[20px] h-[20px] relative overflow-hidden !z-20 cursor-pointer">
                    <Image
                      src={'/icons/image-add.svg'}
                      alt="add icon"
                      fill
                      className="w-full h-full"
                    />
                  </div>
                  {coverPic &&
                    isFileList(coverPic) &&
                    coverPic?.[0]?.type?.includes('image/') && (
                      <div className="absolute w-full !z-30">
                        <div className="w-full h-[120px] relative overflow-hidden ">
                          <Image
                            src={URL.createObjectURL(coverPic?.[0])}
                            alt="Selected Image"
                            fill
                            className="object-contain object-center"
                          />
                        </div>
                      </div>
                    )}
                  {coverPic && !isFileList(coverPic) && (
                    <div className="absolute w-full !z-30">
                      <div className="w-full h-[120px] relative overflow-hidden ">
                        <Image
                          src={coverPic}
                          alt="Selected Image"
                          fill
                          className="object-contain object-center"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>
              {errors?.icon && (
                <div className="text-red-500 text-[0.75rem]">
                  {errors?.icon?.message?.toString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center gap-[15px] text-[16px] text-white font-medium">
        <button
          className="flex justify-center items-center !w-[134px] p-[10px] !bg-[#A90011] rounded-[10px] border"
          onClick={() => {
            closeFunction()
          }}
        >
          Cancel
        </button>
        <button
          className="flex justify-center items-center !w-[134px] p-[10px] !bg-[#126106] rounded-[10px] border"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {isEdit ? 'Update' : 'Save'}
          {loading && (
            <CircularProgress color="inherit" size={15} className="ml-2" />
          )}
        </button>
      </div>
    </div>
  )
}

export default Child
