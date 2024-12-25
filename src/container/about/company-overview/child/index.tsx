import SelectField from '@/components/SelectComponent/SelectField'
import TextEditor from '@/components/TextEditorComponent'
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
    watchValues,
    errors,
    closeFunction,
    setEditorValue,
    editorValue,
    handleEditorChange,
    headerOptions,
    control,
    setValue,
  } = props

  const selectProps = {
    control,
    setValue,
  }

  return (
    <div className="w-full pr-[20px] text-black">
      <div className="w-full flex justify-between items-center mb-[30px]">
        <div className="font-semibold text-[1.25rem] font-faustina w-fit border-b border-[#62B82F]">
          {isEdit ? 'Edit' : 'Add'} Company Overview
        </div>
      </div>
      <div className="w-full mb-[30px] flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-y-[10px]">
          <label htmlFor="name" className="text-[12px] md:text-[14px]">
            Heading
          </label>
          {/* <input
            {...register('name')}
            type="text"
            placeholder="Google"
            className="ring-0 outline-none border border-[#D1D1D1] p-[10px] rounded-[10px] bg-[#FFFFFF80]"
          /> */}
          <div className="flex flex-col gap-y-[10px]">
            <SelectField
              {...selectProps}
              placeholder="Select..."
              name="name"
              value={headerOptions?.filter(
                (u: any) => u.value == watchValues.name,
              )}
              options={headerOptions}
            />
            {errors?.name && (
              <div className="text-red-500 text-[0.75rem]">
                {errors?.name?.message?.toString()}
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
