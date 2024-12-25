'use client'

import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'
import Loader from '@/components/Loader/Loader'
import { API_URLS } from '@/constants/ApiRoutes'
import CreateComponent from '@/container/contact/tou/CreateComponent'
import apiHandler from '@/utils/apiHandler'
import { openModal } from '@/utils/openModal'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import DeleteIcon from '../../../../../public/icons/delete.svg'
import EditIcon from '../../../../../public/icons/edit.svg'

const Page = () => {
  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    data: [
      {
        id: 1,
        heading: 'Empowering Businesses with AI-Driven Solutions',
        body: 'Empowering Businesses with AI-Driven Solutions',
      },
    ],
  })

  const getOtherTopics = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.get(`${API_URLS.GET_OTHERS_API}`)

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
    getOtherTopics()
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
      getOtherTopics,
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
      getOtherTopics,
    )
  }
  const handleDelete = async (id: any, type?: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.OTHERS_API}`,
        false,
        { id },
      )
      getOtherTopics()

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

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-[1.25rem] ">
        <div className="flex justify-end items-center gap-4 flex-wrap">
          <button
            className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
            onClick={() => handleClickAdd('tou')}
          >
            Create
          </button>
          {/* <button
            className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
            onClick={() => handleClickAdd('privacy')}
          >
            Create Privacy Poliicy
          </button> */}
        </div>
      </div>

      {/* main */}

      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem] mb-[1.5rem]">
        {state?.loading ? (
          <div className="py-20">
            <Loader />
          </div>
        ) : !state?.loading && !state?.data ? (
          <div className="my-6">No Data Found</div>
        ) : (
          <>
            {state?.data?.map((tD: any, index: number) => (
              <div
                className="flex justify-between items-center gap-y-[1rem] border-b "
                key={index}
              >
                <div className=" text-[1rem] font-semibold">{tD.name}</div>

                <div className="flex justify-end items-center  py-[14px]">
                  <div className="flex items-center gap-[1rem]">
                    <div
                      className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                      onClick={() => handleClickDelete(tD?.id, 'tou')}
                    >
                      <div className="w-[22px] h-[22px] relative overflow-hidden !z-20 cursor-pointer">
                        <Image
                          src={DeleteIcon}
                          alt="delete icon"
                          fill
                          className="w-full h-full aspect-video"
                        />
                      </div>
                    </div>
                    <div
                      className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                      onClick={() => handleClickEdit(tD, 'tou')}
                    >
                      <div className="w-[22px] h-[22px] relative overflow-hidden !z-20 cursor-pointer ">
                        <Image
                          src={EditIcon}
                          alt="edit icon"
                          fill
                          className="w-full h-full aspect-video"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Page
