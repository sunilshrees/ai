'use client'

import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'
import Loader from '@/components/Loader/Loader'
import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { openModal } from '@/utils/openModal'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import DeleteIcon from '../../../../../public/icons/delete.svg'
import EditIcon from '../../../../../public/icons/edit.svg'
import { cn } from '@/utils/utils'
import CreateComponent from '@/container/about/leadership-team/CreateComponent'

const Page = () => {
  // managing states
  const [state, setState] = useState<any>({
    loading: false,
    data: null,
  })

  const getTeamList = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.get(`${API_URLS.GET_TEAM_API}`)

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
    getTeamList()
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
      getTeamList,
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
      getTeamList,
    )
  }
  const handleDelete = async (id: any, type?: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.TEAM_API}`,
        false,
        { id },
      )
      getTeamList()

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
            onClick={() => handleClickAdd('title')}
          >
            Create Team
          </button>
        </div>
      </div>

      {/* main */}

      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem]">
        <div className="w-fit font-semibold text-[1.125rem] sm:text-[1.25rem] border-b border-[#62B82F] mb-[2rem]">
          Leadership Team
        </div>

        <div className="w-full flex justify-start ">
          <div className="w-full flex flex-wrap gap-[1.25rem] md:px-2">
            {state?.loading && <Loader />}
            {!state?.loading && (!state?.data || state?.data?.length == 0) && (
              <div>No Data Found</div>
            )}
            {!state?.loading &&
              state?.data?.map((deta: any, index: number) => (
                <div
                  className="w-[28.5rem] h-[36.75rem] border border-[#62B82F] rounded-[20px] p-[1.75rem] flex flex-col justify-between"
                  key={index}
                >
                  <div
                    className={cn(
                      'w-full h-[18.75rem] relative overflow-hidden !z-20  popular-destination-shadow cursor-pointer transition-all duration-300 ease-in-out mb-[15px] ',
                    )}
                  >
                    <Image
                      src={deta.image}
                      alt={deta.name}
                      fill
                      className="w-full h-full object-cover object-center aspect-video"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-start items-start  py-[14px] border-b border-[#62B82F]">
                    <h1>{deta.name}</h1>
                    <h1>{deta.position}</h1>
                    <div
                      className="break-words text-editor-content"
                      dangerouslySetInnerHTML={{
                        __html: deta?.description ?? '-',
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-center items-center  py-[14px]">
                    <div className="flex items-center gap-[1rem]">
                      <div
                        className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                        onClick={() => handleClickDelete(deta?.id, 'title')}
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
                        onClick={() => handleClickEdit(deta, 'title')}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
