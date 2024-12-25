import { openModal } from '@/utils/openModal'
import { isFileList } from '@/utils/utils'
import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import CreateComponent from '../CreateComponentService'
import TextEditor from '@/components/TextEditorComponent'
import { customStyles } from '@/components/SelectComponent/SelectField'
import Select from 'react-select'
import CreateTypeComponent from '../CreateTypeComponent'
import DeleteIcon from '../../../../../public/icons/delete.svg'

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
    setEditorValue,
    editorValue,
    handleEditorChange,
    handleSelectChange,
    EventsTypeOptions,
    selectedOptions,
    getEventsType,
    handleDetailsArray,
    detailsArray,
    handleRemoveDetails,
  } = props

  const handleClickAddType = () => {
    openModal(
      CreateTypeComponent,
      null,
      {
        height: '80vh',
        width: '700px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      () => {
        getEventsType()
      },
    )
  }

  const handleClickAdd = () => {
    openModal(
      CreateComponent,
      null,
      {
        height: '80vh',
        width: '700px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      (data: any) => {
        handleDetailsArray(data)
      },
    )
  }

  const coverPic = watch('image')

  return (
    <div className="w-full pr-[20px] text-black">
      <div className="w-full flex justify-between items-center mb-[30px]">
        <div className="font-semibold text-[1.25rem] font-faustina w-fit border-b border-[#62B82F]">
          {isEdit ? 'Edit' : 'Create'} Events
        </div>
      </div>
      <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="name" className="text-[12px] md:text-[14px]">
            Event Title
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Empowering Businesses with AI-Driven Solutions"
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
          {errors?.name && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.name?.message?.toString()}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-[10px]">
          <div className="w-full flex justify-between items-center">
            <label htmlFor="type" className="text-[12px] md:text-[14px]">
              Event Type
            </label>
            <button
              className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
              onClick={() => handleClickAddType()}
            >
              Add +
            </button>
          </div>

          <Select
            options={EventsTypeOptions}
            components={{
              IndicatorSeparator: null,
            }}
            value={selectedOptions}
            className={
              'p-0 m-0  w-full  text-[12px] bg-[#FFF]  rounded-[10px] '
            }
            placeholder="Select..."
            onChange={handleSelectChange}
            isClearable
            isSearchable
            menuPosition="fixed"
            styles={customStyles({ backgroundColor: '#fff' })}
            isMulti
          />
          {errors?.type && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.type?.message?.toString()}
            </div>
          )}
        </div>
        <div className="w-full grid grid-cols-2 gap-[0.625rem]">
          <div className="flex flex-col gap-y-[10px]">
            <label htmlFor="event_date" className="text-[12px] md:text-[14px]">
              Event Date
            </label>
            <input
              {...register('event_date')}
              type="date"
              placeholder="Empowering Businesses with AI-Driven Solutions"
              className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
            />
            {errors?.event_date && (
              <div className="text-red-500 text-[0.75rem]">
                {errors?.event_date?.message?.toString()}
              </div>
            )}
          </div>{' '}
          <div className="flex flex-col gap-y-[10px]">
            <label htmlFor="event_time" className="text-[12px] md:text-[14px]">
              Event Time
            </label>
            <input
              {...register('event_time')}
              type="time"
              placeholder="Empowering Businesses with AI-Driven Solutions"
              className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
            />
            {errors?.event_time && (
              <div className="text-red-500 text-[0.75rem]">
                {errors?.event_time?.message?.toString()}
              </div>
            )}
          </div>
        </div>
        <div className="w-full  flex flex-col gap-y-[10px]">
          <div className="flex flex-col gap-y-[10px]">
            <label htmlFor="position" className="text-[12px] md:text-[14px]">
              Cover Image
            </label>
            <input
              {...register('image')}
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
            {errors?.image && (
              <div className="text-red-500 text-[0.75rem]">
                {errors?.image?.message?.toString()}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="position" className="text-[12px] md:text-[14px]">
            Body Text
          </label>
          <div className="w-full  rounded-[10px] bg-white flex justify-center items-center shadow-sm border">
            <TextEditor
              value={editorValue}
              onChange={(value) => handleEditorChange(value)}
              placeholder=""
            />
          </div>
          {errors?.description && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.description?.message?.toString()}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="price" className="text-[12px] md:text-[14px]">
            Price
          </label>
          <input
            {...register('price')}
            type="text"
            placeholder=""
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          />
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 flex-wrap pb-8">
        <button
          className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
          onClick={() => handleClickAdd()}
        >
          Create Speakers
        </button>
      </div>
      {detailsArray &&
        detailsArray?.length != 0 &&
        detailsArray?.map((dA: any, index: any) => (
          <div
            className="flex items-center gap-[1rem] p-[0.5rem] border-[0.5px] border-[#61b82fab] rounded-md mb-4"
            key={index}
          >
            <div className="w-full flex flex-col gap-y-[0.625rem]">
              <div className=" text-[1rem]">{dA?.name}</div>
            </div>

            <div className="flex justify-end items-end  gap-2">
              <div
                className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                onClick={() => {
                  handleRemoveDetails(dA)
                }}
              >
                <div className="w-[16px] h-[16px] relative overflow-hidden !z-20 cursor-pointer">
                  <Image
                    src={DeleteIcon}
                    alt="delete icon"
                    fill
                    className="w-full h-full aspect-video"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="w-full flex justify-end items-center gap-[15px] text-[16px] text-white font-medium pb-4">
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