import TextEditor from '@/components/TextEditorComponent'
import { openModal } from '@/utils/openModal'
import { isFileList } from '@/utils/utils'
import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import CreateTypeComponent from '../CreateTypeComponent'
import Select from 'react-select'
import { customStyles } from '@/components/SelectComponent/SelectField'

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
    BlogTypeOptions,
    getBlogType,
    selectedOptions,
  } = props

  const coverPic = watch('image')

  const handleClickAdd = () => {
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
        getBlogType()
      },
    )
  }

  return (
    <div className="w-full pr-[20px] text-black">
      <div className="w-full flex justify-between items-center mb-[30px]">
        <div className="font-semibold text-[1.25rem] font-faustina w-fit border-b border-[#62B82F]">
          {isEdit ? 'Edit' : 'Create'} Blog
        </div>
      </div>
      <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="name" className="text-[12px] md:text-[14px]">
            Title
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder=""
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
              Blog Category
            </label>
            <button
              className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
              onClick={() => handleClickAdd()}
            >
              Add +
            </button>
          </div>

          <Select
            options={BlogTypeOptions}
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
          {errors?.category && (
            <div className="text-red-500 text-[0.75rem]">
              {errors?.category?.message?.toString()}
            </div>
          )}
        </div>
        <div className="w-full flex items-center gap-[0.625rem] col-span-2">
          <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
            <div className="flex flex-col gap-y-[10px]">
              <label htmlFor="position" className="text-[12px] md:text-[14px]">
                Select Cover Image
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
        </div>

        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="description" className="text-[12px] md:text-[14px]">
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
      </div>
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
