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
          {isEdit ? 'Edit' : 'Create'} About Us
        </div>
      </div>
      <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="description" className="text-[12px] md:text-[14px]">
            Body Text
          </label>
          <textarea
            {...register('description')}
            rows={5}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et vulputate tortor, in posuere nibh. Praesent sit amet metus porttitor mi consectetur pellentesque in at leo."
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3  gap-[0.625rem]">
          <div className="w-full flex flex-col gap-y-[10px]">
            <label
              htmlFor="client_number"
              className="text-[12px] md:text-[14px]"
            >
              Client Number
            </label>
            <input
              {...register('client_number')}
              type="number"
              placeholder="85"
              className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
            />
          </div>
          <div className="w-full flex flex-col gap-y-[10px]">
            <label htmlFor="years" className="text-[12px] md:text-[14px]">
              Years
            </label>
            <input
              {...register('years')}
              type="number"
              placeholder="2"
              className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
            />
          </div>
          <div className="w-full flex flex-col gap-y-[10px]">
            <label htmlFor="industries" className="text-[12px] md:text-[14px]">
              Industries
            </label>
            <input
              {...register('industries')}
              type="number"
              placeholder="20"
              className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
            />
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
