'use client'

import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'
import Loader from '@/components/Loader/Loader'
import { API_URLS } from '@/constants/ApiRoutes'
import AddComponent from '@/container/insights/events-images/AddComponent'
import apiHandler from '@/utils/apiHandler'
import { openModal } from '@/utils/openModal'
import { cn } from '@/utils/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import DeleteIcon from '../../../../../public/icons/delete.svg'
import EditIcon from '../../../../../public/icons/edit.svg'

const EventsImagesPage = () => {
  const router = useRouter()

  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    data: null,
  })

  const getEventsImages = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.get(`${API_URLS.LIST_EVENT_IMAGES_API}`)

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
    getEventsImages()
  }, [])

  const handleClickAdd = () => {
    openModal(
      AddComponent,
      null,
      {
        height: '',
        width: '600px',
        borderRadius: '8px',

        closeOnClickOutside: true,
      },
      getEventsImages,
    )
  }
  const handleClickEdit = (data: any) => {
    openModal(
      AddComponent,
      { data },
      {
        height: '',
        width: '600px',
        borderRadius: '8px',

        closeOnClickOutside: true,
      },
      getEventsImages,
    )
  }

  const handleDelete = async (id: any) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.EVENT_IMAGES_API}`,
        false,
        { id },
      )
      getEventsImages()
      toast.success('Deleted successfully.')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    }
  }

  const handleClickDelete = (id: any) => {
    openModal(
      ConfirmationModal,
      null,
      {
        height: '',
        width: '372px',
        borderRadius: '8px',

        closeOnClickOutside: true,
      },
      () => {
        handleDelete(id)
      },

      {
        heading: 'Confirm Delete',
        title: 'Are you sure you want to delete this ?',
        approveText: 'Yes',
      },
    )
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-[50px]">
        <div className="w-fit font-semibold text-[1.125rem] sm:text-[1.25rem] ">
          Events Images
        </div>
        <button
          className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
          onClick={handleClickAdd}
        >
          Add Events Images
        </button>
      </div>

      {/* main */}

      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem]">
        {state?.loading ? (
          <div className="py-20">
            <Loader />
          </div>
        ) : !state?.loading && !state?.data ? (
          <div className="my-6">No Data Found</div>
        ) : (
          <>
            <div className="flex flex-col gap-y-[1rem] my-[1.25rem]">
              <div className="flex flex-col gap-y-[0.625rem]">
                <div className="font-medium text-[1rem]">Description</div>
                <div className=" text-[1rem] border border-[#62B82F] rounded-[10px] p-[1rem]">
                  {state?.data?.description ?? '-'}
                </div>
              </div>
              <div className="w-full flex flex-wrap gap-[30px] px-2">
                {state?.data?.images &&
                  state?.data?.images?.length > 0 &&
                  state?.data?.images?.map((deta: any, index: number) => (
                    <div key={index} className="w-full md:w-auto">
                      <div className="w-full  border border-[#62B82F] rounded-[20px] px-[1.25rem] p-[1rem] flex justify-center items-center">
                        <div
                          className={cn(
                            'w-[16rem] h-[9rem] relative overflow-hidden !z-20  popular-destination-shadow cursor-pointer transition-all duration-300 ease-in-out mb-[15px] ',
                          )}
                        >
                          <Image
                            src={deta.image}
                            alt={'events images'}
                            fill
                            className="w-full h-full object-contain object-center aspect-video"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-end items-center  py-[14px]">
                <div className="flex items-center gap-[1rem]">
                  <div
                    className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                    onClick={() => handleClickDelete(state?.data?.id)}
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
                    onClick={() => handleClickEdit(state?.data)}
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
          </>
        )}
      </div>
    </div>
  )
}

export default EventsImagesPage
