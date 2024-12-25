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

  const coverPic = watch('image')

  return (
    <div className="w-full pr-[20px] text-black">
      <div className="w-full flex justify-between items-center mb-[30px]">
        <div className="font-semibold text-[1.25rem] font-faustina w-fit border-b border-[#62B82F]">
          {isEdit ? 'Edit' : 'Create'} Contact Information
        </div>
      </div>
      {/* <div className="w-full mb-[30px] flex flex-col gap-y-[10px]"> */}
      <div className="w-full grid md:grid-cols-6 gap-[1rem] mb-[1.75rem] ">
        <div className="flex flex-col gap-y-[10px] md:col-span-2">
          <label htmlFor="phone" className="text-[12px] md:text-[14px]">
            Phone Number
          </label>
          <input
            {...register('phone')}
            type="text"
            placeholder=""
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
          {errors?.phone && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.phone?.message?.toString()}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-[10px] md:col-span-2">
          <label htmlFor="email" className="text-[12px] md:text-[14px]">
            Email
          </label>
          <input
            {...register('email')}
            type="text"
            placeholder=""
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
          {errors?.email && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.email?.message?.toString()}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-[10px] md:col-span-2">
          <label htmlFor="address" className="text-[12px] md:text-[14px]">
            Location
          </label>
          <input
            {...register('address')}
            type="text"
            placeholder=""
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
          {errors?.address && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.address?.message?.toString()}
            </div>
          )}
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
