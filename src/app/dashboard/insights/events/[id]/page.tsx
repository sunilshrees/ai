'use client'

import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'
import Loader from '@/components/Loader/Loader'
import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { openModal } from '@/utils/openModal'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import CreateComponent from '@/container/about/company-overview/CreateComponent'

import BackButton from '@/components/BackButton'
import Table from '@/components/Table'
import { BookedEventListColumn } from '@/constants/common'

const Page = () => {
  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    data: null,
  })

  const getBookedEventLists = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.get(`${API_URLS.BOOKED_EVENTS_API}`)

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
    getBookedEventLists()
  }, [])

  const handleClickAdd = (type: string) => {
    openModal(
      CreateComponent,
      null,
      {
        height: '80vh',
        width: '800px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      getBookedEventLists,
    )
  }
  const handleClickEdit = (data: any, type?: string) => {
    openModal(
      CreateComponent,

      { data },
      {
        height: '80vh',
        width: '800px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      getBookedEventLists,
    )
  }
  const handleDelete = async (id: any, type?: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.BOOKED_EVENTS_API}`,
        false,
        { id },
      )
      getBookedEventLists()

      toast.success('Deleted successfully.')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    }
  }
  const handleClickDelete = (id: any, type?: string) => {
    openModal(
      ConfirmationModal,
      null,
      {
        height: '',
        width: '410px',
        borderRadius: '8px',

        closeOnClickOutside: true,
      },
      () => {
        handleDelete(id, type)
      },

      {
        heading: 'Confirm Delete',
        title: 'Are you sure you want to delete this ?',
        approveText: 'Delete',
        isDelete: true,
      },
    )
  }

  const tableProps = {
    data: state?.loading ? [] : state?.data,
    columns: BookedEventListColumn,
    handleDelete: handleClickDelete,
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

      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem]">
        <div className="w-fit font-semibold text-[1.125rem] sm:text-[1.25rem] border-b border-[#62B82F] mb-[2rem]">
          Booked Event List
        </div>
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
