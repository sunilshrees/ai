'use client'

import BackButton from '@/components/BackButton'
import Loader from '@/components/Loader/Loader'
import Table from '@/components/Table'
import { API_URLS } from '@/constants/ApiRoutes'
import { JOB_APPLICATION_COLUMN } from '@/constants/common'
import apiHandler from '@/utils/apiHandler'
import { useEffect, useState } from 'react'

const Page = ({ params }: any) => {
  const { id } = params

  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    data: [],
    status: 'all',
  })

  const getJobList = async (id: any) => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.post(`${API_URLS.APPLIED_JOBS_API}`, {
        id,
      })

      if (response?.data) {
        setState((prev: any) => ({
          ...prev,
          loading: false,
          data: response.data,
        }))
      }
    } catch (error) {
      setState((prev: any) => ({ ...prev, loading: false, data: null }))
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      getJobList(id)
    }
  }, [state.status])

  const tableProps = {
    data: state.loading ? [] : state.data,
    columns: JOB_APPLICATION_COLUMN,
    downloadName: 'resume',
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-[1.25rem] ">
        <div className="w-full flex justify-between items-center gap-4 flex-wrap">
          <BackButton />
          {/* <button
            className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
            onClick={() => handleClickAdd('title')}
          >
            Create Hero Section
          </button> */}
        </div>
      </div>
      {/* main */}

      <div className="w-full p-[0.5rem] md:p-[1.5rem] bg-white rounded-[0.625rem]">
        {state?.loading ? (
          <div className="py-20">
            <Loader />
          </div>
        ) : !state?.loading && !state?.data ? (
          <div className="my-6">No Data Found</div>
        ) : (
          <Table {...tableProps} />
        )}
      </div>
    </div>
  )
}

export default Page
