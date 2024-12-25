import { openModal } from '@/utils/openModal'
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
          {isEdit ? 'Edit' : 'Create'} Speakers
        </div>
      </div>
      <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="name" className="text-[12px] md:text-[14px]">
            Full Name
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Priya Sharma"
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
        </div>
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="position" className="text-[12px] md:text-[14px]">
            Position
          </label>
          <input
            {...register('position')}
            type="text"
            placeholder="CTO"
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
        </div>
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="organization" className="text-[12px] md:text-[14px]">
            Organization
          </label>
          <input
            {...register('organization')}
            type="text"
            placeholder="Organization"
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
        </div>
        <div className="w-full flex items-center gap-[0.625rem] col-span-2">
          <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
            <div className="flex flex-col gap-y-[10px]">
              <label htmlFor="position" className="text-[12px] md:text-[14px]">
                Select Image
              </label>
              <input
                {...register('image')}
                id="subnav-image1"
                type="file"
                accept="image/jpeg,image/png"
                className="flex-1 ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] hidden bg-[#FFFFFF80]"
              />
              <label
                htmlFor="subnav-image1"
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
              {errors?.image && (
                <div className="text-red-500 text-[0.75rem]">
                  {errors?.image?.message?.toString()}
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
