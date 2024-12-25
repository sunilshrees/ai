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
import { BookedEventListColumn, InquiryColumn } from '@/constants/common'
import { cn } from '@/utils/utils'
import SelectField from '@/components/SelectComponent/SelectField'

const Page = () => {
  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    data: [],
    status: 'all',
  })

  const getAllInquiries = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.post(`${API_URLS.INQUIRY_API}`, {
        input_type: state.status,
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
    getAllInquiries()
  }, [state.status])

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
      getAllInquiries,
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
      getAllInquiries,
    )
  }
  const handleDelete = async (id: any, type?: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.INQUIRY_API}`,
        false,
        { id },
      )
      getAllInquiries()

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
  const handleSeen = async (id: any) => {
    try {
      const response = await apiHandler.patch(
        `${API_URLS.INQUIRY_API}`,
        false,
        { id },
      )
      getAllInquiries()

      toast.success('Marked as seen successfully.')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    }
  }
  const handleClickSeen = (data: any) => {
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
        handleSeen(data?.id)
      },
      {
        heading: 'Confirmation',
        title: 'Are you sure you want to update this to seen ?',
        approveText: 'Yes',
        isDelete: true,
      },
    )
  }

  const tableProps = {
    data: state.loading ? [] : state.data,
    columns: InquiryColumn,
    handleDelete: handleClickDelete,
    handleSeen: handleClickSeen,
  }
  const selectOptions = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Seen',
      value: 'seen',
    },
    {
      label: 'Unseen',
      value: 'unseen',
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-[1.25rem] ">
        <div className="w-full flex justify-between items-center gap-4 flex-wrap">
          <div></div>
          <div className="flex gap-4">
            <div className="w-[150px] sm:w-[250px]">
              <SelectField
                placeholder="Select Status"
                name="status"
                setState={setState}
                hasStateHandler
                isClearable={false}
                options={selectOptions}
                value={selectOptions?.filter(
                  (u: any) => u.value == state.status,
                )}
              />
            </div>
            {/* <button
              className={cn(
                'flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]',
                {
                  'border-primary': active == 'unseen',
                },
              )}
              onClick={() => {
                setActive('unseen')
              }}
            >
              Unseen
            </button>
            <button
              className={cn(
                'flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]',
                {
                  'border-primary': active == 'seen',
                },
              )}
              onClick={() => {
                setActive('seen')
              }}
            >
              Seen
            </button> */}
          </div>
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
