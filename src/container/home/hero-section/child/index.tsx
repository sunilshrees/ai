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

  const image = watch('image')
  const video = watch('video')

  return (
    <div className="w-full pr-[20px] text-black ">
      <div className="w-full flex justify-between items-center mb-[30px]">
        <div className="font-semibold text-[1.25rem] font-faustina w-fit border-b border-[#62B82F]">
          {isEdit ? 'Edit' : 'Create'} Hero Section
        </div>
      </div>
      <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="title" className="text-[12px] md:text-[14px]">
            Heading Text
          </label>
          <input
            {...register('title')}
            type="text"
            placeholder="Empowering Businesses with AI-Driven Solutions"
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
          {errors?.title && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.title?.message?.toString()}
            </div>
          )}
        </div>

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
          {errors?.description && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.description?.message?.toString()}
            </div>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-[0.625rem]">
          <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
            <div className="flex flex-col gap-y-[10px]">
              <label htmlFor="image" className="text-[12px] md:text-[14px]">
                Select Background Image
              </label>
              <input
                {...register('image')}
                id="hero-image"
                type="file"
                accept="image/jpeg,image/png"
                className="flex-1 ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] hidden bg-[#FFFFFF80]"
              />
              <label
                htmlFor="hero-image"
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
                  {image &&
                    isFileList(image) &&
                    image?.[0]?.type?.includes('image/') && (
                      <div className="absolute w-full !z-30">
                        <div className="w-full h-[120px] relative overflow-hidden ">
                          <Image
                            src={URL.createObjectURL(image?.[0])}
                            alt="Selected Image"
                            fill
                            className="object-contain object-center"
                          />
                        </div>
                      </div>
                    )}
                  {image && !isFileList(image) && (
                    <div className="absolute w-full !z-30">
                      <div className="w-full h-[120px] relative overflow-hidden ">
                        <Image
                          src={image}
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
          <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
            <div className="flex flex-col gap-y-[10px]">
              <label htmlFor="video" className="text-[12px] md:text-[14px]">
                Select Background Video
              </label>
              <input
                {...register('video')}
                id="hero-video"
                type="file"
                accept="video/*"
                className="flex-1 ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] hidden bg-[#FFFFFF80]"
              />
              <label
                htmlFor="hero-video"
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
                  {video &&
                    isFileList(video) &&
                    video?.[0]?.type?.includes('video/') && (
                      <div className="absolute w-full !z-30">
                        <div className="w-full h-[120px] relative overflow-hidden ">
                          <video
                            src={URL.createObjectURL(video?.[0])}
                            className="object-contain object-center w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  {video && !isFileList(video) && (
                    <div className="absolute w-full !z-30">
                      <div className="w-full h-[120px] relative overflow-hidden ">
                        <video
                          src={video}
                          className="object-contain object-center w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>
              {errors?.video && (
                <div className="text-red-500 text-[0.75rem]">
                  {errors?.video?.message?.toString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center gap-[15px] text-[16px] text-white font-medium pb-[1.5rem]">
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
