import TextEditor from '@/components/TextEditorComponent'
import { cn, isFileList } from '@/utils/utils'
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
    setEditorValue,
    editorValue,
    handleEditorChange,
  } = props

  return (
    <div className="w-full pr-[20px] text-white bg-[#1E1E1E]">
      <div className="w-full flex justify-between items-center mb-[30px]">
        <div className="font-semibold text-[1.25rem] font-faustina w-fit border-b border-[#62B82F]">
          Application Form
        </div>
      </div>
      <div className="w-full mb-[30px] flex flex-col gap-y-[20px]">
        <input
          {...register('name')}
          type="text"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.name,
            },
          )}
          placeholder="Full Name"
        />
        <input
          {...register('email')}
          type="text"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.email,
            },
          )}
          placeholder="Email"
        />
        <input
          {...register('number')}
          type="text"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.number,
            },
          )}
          placeholder="Phone Number"
        />
        <input
          {...register('address')}
          type="text"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.address,
            },
          )}
          placeholder="Address"
        />
        <input
          {...register('resume')}
          accept=".pdf,.PDF"
          type="file"
          className={cn(
            'px-[1rem] py-[0.75rem] border border-[#B6B6B6] rounded-[10px] bg-transparent ring-0 outline-0',
            {
              'border-red-500 border outline-red-500': errors?.resume,
            },
          )}
          placeholder="Resume"
        />
      </div>
      <div className="w-full flex justify-end items-center gap-[15px] text-[16px] text-white font-medium pb-2">
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
          Apply
          {loading && (
            <CircularProgress color="inherit" size={15} className="ml-2" />
          )}
        </button>
      </div>
    </div>
  )
}

export default Child
